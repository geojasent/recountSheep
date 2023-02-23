import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { DateSelector, DaySelector, TimeBedSelector, TimeAwakeSelector } from '../components/dateTimePicker';
import { PeopleInput } from '../components/PeopleInput';
import { TypeDream } from '../components/TypeDream';
import { Location } from '../components/Location';
import { Dream } from '../components/Dream';
import { Card, Dropdown, Accordion, Modal, Button } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

export interface IFormData {
    dreamId: string | null;
    userId: string | null;
    dayOfMonth: Date | null;
    date: string | undefined;
    dayOfWeek: string;
    dateTimeToBed: Date | null;
    timeToBed: string;
    timeAwake: number;
    dreamLocation: string;
    people: Array<string>;
    typeOfDream: string;
    dreamDescription: string;
}
const UPDATEDREAMDATA: IFormData = {
    dreamId: null,
    userId: null,
    dayOfMonth: null,
    date: undefined,
    dayOfWeek: '',
    dateTimeToBed: null,
    timeToBed: '',
    timeAwake: 0,
    people: [],
    dreamLocation: '',
    typeOfDream: '',
    dreamDescription: ''
};

export function DreamComponent() {
    const [dreams, setDreams] = useState<any[]>([]);
    const [data, setData] = useState(UPDATEDREAMDATA);

    //Modal Popup
    const [showDeleteDreamModal, setShowDeleteDreamModal] = useState(false);
    const handleDeleteClose = () => setShowDeleteDreamModal(false);
    const handleDeleteShow = () => setShowDeleteDreamModal(true);
    const [showUpdateDreamModal, setShowUpdateDreamModal] = useState(false);
    const handleUpdateClose = () => {
        setShowUpdateDreamModal(false);
        window.location.reload();
    };

    const handleUpdateShow = () => setShowUpdateDreamModal(true);

    function updateFields(fields: Partial<IFormData>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const getDream = async () => {
                try {
                    const response = await fetch('https://recountsheep-server.onrender.com/viewdreams', {
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    response.json().then((res) => {
                        if (isActive) {
                            let sortDate = res
                                .map((obj: any) => {
                                    return { ...obj, day_of_month: new Date(obj.day_of_month) };
                                })
                                .sort((a: any, b: any) => b.day_of_month - a.day_of_month);
                            let convertDateToMMDDYYY = sortDate.map((obj: any) => {
                                return { ...obj, day_of_month: obj.day_of_month.toLocaleDateString() };
                            });
                            setDreams(convertDateToMMDDYYY);
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            };
            getDream();
            return () => {
                isActive = false;
            };
        }, [])
    );

    function convert2400toAMPM(twentyFour: string) {
        let temp: number = Number(String(twentyFour).split(':').join('')) - 1200;
        let stringTemp = '';
        if (temp < 0) {
            if (temp < 0) {
                temp = temp + 1200;
                if (temp < 60) {
                    stringTemp = String(temp + 1200) + ' am';
                } else {
                    stringTemp = String(temp) + ' am';
                }
            }
        } else if (temp === 0) {
            stringTemp = '1200 am';
        } else {
            stringTemp = String(temp) + ' pm';
        }
        return stringTemp.slice(0, -5) + ':' + stringTemp.slice(-5);
    }

    //set default for update dream form
    const defaultDreamUpdateData = (index: number) => {
        let dream = dreams[index];
        data.dreamId = dream.dream_id;
        data.dayOfMonth = dream.day_of_month !== 'Invalid Date' ? new Date(dream.day_of_month) : new Date();
        data.date = data.dayOfMonth.toLocaleDateString();
        data.dayOfWeek = dream.day_of_week;
        data.timeToBed = dream.time_to_bed;
        data.timeAwake = dream.time_awake;
        data.people = dream.people;
        data.dreamLocation = dream.dream_location;
        data.typeOfDream = dream.type_of_dream;
        data.dreamDescription = dream.dream_description;
        console.log(data);
    };

    const updateDream = async () => {
        try {
            const response = await fetch('https://recountsheep-server.onrender.com/updatedream/' + data.dreamId, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteDream = async (dream_id: number) => {
        try {
            const response = await fetch(`https://recountsheep-server.onrender.com/deletedream/` + dream_id, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            response.json().then((res) => {
                if (res === 1) {
                    window.location.reload();
                } else {
                    alert('Error ocurred');
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {dreams.map((dream, index) => {
                return (
                    <div className="dreamContainer" key={index} id={String(index)}>
                        <Card>
                            <Card.Header id="cardHeaderContainer">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {dream.day_of_month}
                                    <Dropdown>
                                        <Dropdown.Toggle split variant="basic" id="dropdown-split-basic" />
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                key={index}
                                                eventKey={dream.dream_id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleUpdateShow();
                                                    defaultDreamUpdateData(index);
                                                }}
                                            >
                                                <Modal
                                                    show={showUpdateDreamModal}
                                                    onKeyDown={(e: any) => e.stopPropagation()}
                                                    onClick={(e: any) => {
                                                        e.stopPropagation();
                                                    }}
                                                    onHide={handleUpdateClose}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Update Dream</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <DateSelector {...data} updateFields={updateFields} />
                                                        <DaySelector {...data} updateFields={updateFields} />
                                                        <TimeBedSelector {...data} updateFields={updateFields} />
                                                        <TimeAwakeSelector {...data} updateFields={updateFields} />
                                                        <PeopleInput {...data} updateFields={updateFields} />
                                                        <Location {...data} updateFields={updateFields} />
                                                        <TypeDream {...data} updateFields={updateFields} />
                                                        <Dream {...data} updateFields={updateFields} />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUpdateClose();
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="primary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUpdateClose();
                                                                updateDream();
                                                            }}
                                                        >
                                                            Update
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                Update
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteShow();
                                                }}
                                            >
                                                <Modal
                                                    show={showDeleteDreamModal}
                                                    onClick={(e: any) => {
                                                        e.stopPropagation();
                                                    }}
                                                    onHide={handleDeleteClose}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Delete Dream</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are you sure you want to delete this dream?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteClose();
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="primary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteClose();
                                                                deleteDream(dream.dream_id);
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Card.Header>
                            <section className="dreamItemDropdownToggle">
                                <Accordion>
                                    <Accordion.Item eventKey={dream.dream_id}>
                                        <Accordion.Header>{dream.dream_description}</Accordion.Header>

                                        <AccordionBody>
                                            <div id={dream.dream_id} key={dream.dream_id}>
                                                <div id="dreamDay">Day of Week: {dream.day_of_week}</div>
                                                <div id="dreamTimeToBed">Time to Bed: {convert2400toAMPM(dream.time_to_bed)}</div>
                                                <div id="dreamMinutesAwake">Minutes Awake: {dream.time_awake}</div>
                                                <div id="dreamPeople">People in Dream: {dream.people.join(', ') || 'None'}</div>
                                                <div id="dreamLocation">Location: {dream.dream_location}</div>
                                                <div id="dreamType">Type of Dream: {dream.type_of_dream}</div>
                                            </div>
                                        </AccordionBody>
                                    </Accordion.Item>
                                </Accordion>
                            </section>
                        </Card>
                    </div>
                );
            })}
        </>
    );
}
