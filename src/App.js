import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
    return (
        <div className="container">
            <DndProvider backend={HTML5Backend}>
                <Header />
                <Body />
            </DndProvider>
        </div>
    )
}
