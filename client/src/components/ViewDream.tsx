import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Dropdown, Accordion, Modal, Button } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';

export function DreamComponent() {
    const [dreams, setDreams] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const getDream = async () => {
                try {
                    const response = await fetch('http://localhost:5000/viewdreams', {
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

    //Modal Popup
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function updateDream() {}

    //WORK ON THIS******** and node delete
    const deleteDream = async (dream_id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/deletedream/` + dream_id, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            response.json().then((res) => {
                console.log(res);
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {dreams.map((dream) => {
                return (
                    <div className="dreamContainer" key={dream.dream_id}>
                        <Card>
                            <Card.Header id="cardHeaderContainer">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {dream.day_of_month}
                                    <Dropdown>
                                        <Dropdown.Toggle split variant="basic" id="dropdown-split-basic" />
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    updateDream();
                                                }}
                                            >
                                                Update
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleShow();
                                                }}
                                            >
                                                <Modal
                                                    show={show}
                                                    onClick={(e: any) => {
                                                        e.stopPropagation();
                                                        handleClose();
                                                    }}
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
                                                                handleClose();
                                                            }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="primary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleClose();
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
