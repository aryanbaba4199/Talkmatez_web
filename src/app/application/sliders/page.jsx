'use client';

import Api, { callerFunction, posterFunction, removerFunction, updaterFunction } from '@/Api';
import React, { useEffect, useState } from 'react';
import { Button, TextField, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const Sliders = () => {
    const [slideData, setSlideData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [formData, setFormData] = useState({ image: '', title: '', rank: 0 });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getSliders();
    }, []);

    const getSliders = async () => {
        setLoading(true);
        try {
            const response = await callerFunction(Api.sliderApi);
            const sortedData = response.data.sort((a, b)=>a.rank-b.rank);
            console.log('socrted is', sortedData);
            setSlideData(sortedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createSlider = async () => {
        setLoading(true);
        try {
            const response = await posterFunction(Api.sliderApi, formData);
            setSlideData([...slideData, response.data]);
            setShowCreate(false);
            setFormData({ image: '', title: '', rank: 0 });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateSlider = async () => {
        setLoading(true);
        try {
            await updaterFunction(`${Api.sliderApi}`, formData);
            getSliders();
            setShowEdit(false);
            setFormData({ image: '', title: '', rank: 0 });
            setEditId(null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteSlider = async (id) => {
        setLoading(true);
        try {
            await removerFunction(`${Api.sliderApi}/${id}`);
            getSliders();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Sliders</h2>
                <Button variant="contained" color="primary" onClick={() => setShowCreate(true)}>Create Slider</Button>
            </div>

            {loading && <CircularProgress />}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {slideData.map((slide) => (
                    <div key={slide.id} className="border rounded-lg shadow p-4">
                        <img src={slide.image} alt={slide.title} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="mt-2 font-semibold">{slide.title}</h3>
                        <p className="text-sm text-gray-600">Rank: {slide.rank}</p>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="outlined" color="primary" startIcon={<AiFillEdit />} onClick={() => {
                                setEditId(slide.id);
                                setFormData({ image: slide.image, title: slide.title, rank: slide.rank, _id : slide._id });
                                setShowEdit(true);
                            }}>Edit</Button>
                            <Button variant="outlined" color="error" startIcon={<AiFillDelete />} onClick={() => deleteSlider(slide._id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
                <DialogTitle>Create Slider</DialogTitle>
                <DialogContent>
                    <TextField label="Image URL" fullWidth margin="dense" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                    <TextField label="Title" fullWidth margin="dense" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <TextField label="Rank" type="number" fullWidth margin="dense" value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowCreate(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={createSlider}>Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
                <DialogTitle>Edit Slider</DialogTitle>
                <DialogContent>
                    <TextField label="Image URL" fullWidth margin="dense" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                    <TextField label="Title" fullWidth margin="dense" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <TextField label="Rank" type="number" fullWidth margin="dense" value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={updateSlider}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Sliders;
