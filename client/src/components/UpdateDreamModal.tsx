import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ImportsNotUsedAsValues } from 'typescript';

interface IUpdateDreamModalData {
    // userId: string | null;
    // dayOfMonth: Date | null;
    // date: string | undefined;
    // dayOfWeek: string;
    // dateTimeToBed: Date | null;
    // timeToBed: string;
    // timeAwake: number;
    // dreamLocation: string;
    // people: Array<string>;
    // typeOfDream: string;
    // dreamDescription: string;
    showUpdateDreamModal: boolean | undefined;
    // day_of_month: 'Invalid Date';
    // day_of_week: 'Tue';
    // dream_description: '';
    // dream_id: 23;
    // dream_location: 'sd';
    // people: [];
    // time_awake: 12;
    // time_to_bed: '';
    // type_of_dream: '';
}

const INITIALUPDATEDREAMDATA: IUpdateDreamModalData = {
    // userId: string | null,
    // dayOfMonth: Date | null,
    // date: string | undefined,
    // dayOfWeek: string,
    // dateTimeToBed: Date | null,
    // timeToBed: string,
    // timeAwake: number,
    // dreamLocation: string,
    // people: Array<string>,
    // typeOfDream: string,
    // dreamDescription: string,
    showUpdateDreamModal: true
};

interface UpdateDreamModalProps extends IUpdateDreamModalData {
    handleUpdateClose: (fields: Partial<IUpdateDreamModalData>) => void;
}

// export function UpdateDreamModal(data: Partial<IUpdateDreamModalProps>) {
export function UpdateDreamModal({ showUpdateDreamModal, handleUpdateClose }: UpdateDreamModalProps) {
    const [data, setData] = useState(INITIALUPDATEDREAMDATA);
    // console.log(data); //use this data as initial state of input values
    // const [updatedShow, setUpdatedShow] = useState(false);
    // const handleClose = () => setUpdatedShow(false);
    // const handleShow = () => setUpdatedShow(true);
    // const [showUpdateDreamModal, setShowUpdateDreamModal] = useState(true);
    // const handleUpdateClose = () => setShowUpdateDreamModal(false);

    // const handleUpdateClose = () => setShowUpdateDreamModal(false);

    return (
        <Modal
            show={data.showUpdateDreamModal}
            onClick={(e: any) => {
                e.stopPropagation();
                handleUpdateClose({ showUpdateDreamModal: false });
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Dream</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to Update this dream?</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateClose({ showUpdateDreamModal: false });
                        console.log('close update');
                        console.log(showUpdateDreamModal);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateClose({ showUpdateDreamModal: false });
                        console.log('update dream');
                    }}
                >
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
