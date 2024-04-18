import { useState } from 'react';
import keysOut from '../data/key_out.json'

<script src="http://localhost:8097"></script>
// const cats = {
//     combo: {
//         title: 'Cable combo',
//         types: {
//             hvdc: 'HVDC', fourx220: '4 x 220kV',
//             fourx275: '4 x 275kV', threex275: '3 x 275kV'
//         }
//     },
//     plat: {
//         title: 'Plat',
//         types: {
//             plat1: '1 plat', plat2: '2 plat', plat3: '3 plat', plat4: '4 plat'
//         }
//     },
//     array: {
//         title: 'Array',
//         types: {
//             array66: '66kV array', array132: '132kV array'
//         }
//     },
//     fiftyormid: {
//         title: '50:50 or Mid',
//         types: {
//             fifty: '50:50', mid: 'Mid'
//         }
//     }
// }

const cats = {
    combo: {
        title: 'Transmission Export',
        types: ['HVDC', '4x220kV', '4x275kV', '3x275kV']
    },
    plat: {
        title: 'Offshore Platform',
        types: ['1 plat', '2 plat', '3 plat', '4 plat']
    },
    array: {
        title: 'Inner Array Voltage',
        types: ['66kV array', '132kV array']
    },
    fiftyormid: {
        title: 'Reactive Power Configuration',
        types: ['50:50', 'Mid']
    }
}


// const possibleWorlds = [
//     {
//         combo: 'hvdc',
//         plat: 'plat1',
//         array: 'array132',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'hvdc',
//         plat: 'plat1',
//         array: 'array66',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'fourx220',
//         plat: 'plat1',
//         array: 'array132',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'fourx275',
//         plat: 'plat1',
//         array: 'array132',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'threex275',
//         plat: 'plat1',
//         array: 'array132',
//         fiftyormid: 'mid'
//     },
//     {
//         combo: 'fourx220',
//         plat: 'plat1',
//         array: 'array66',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'fourx220',
//         plat: 'plat1',
//         array: 'array132',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'fourx275',
//         plat: 'plat1',
//         array: 'array66',
//         fiftyormid: 'fifty'
//     },
//     //70
//     {
//         combo: 'fourx220',
//         plat: 'plat2',
//         array: 'array66',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'fourx275',
//         plat: 'plat2',
//         array: 'array132',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'fourx275',
//         plat: 'plat2',
//         array: 'array66',
//         fiftyormid: 'fifty'
//     },
//     // 73
//     {
//         combo: 'fourx220',
//         plat: 'plat4',
//         array: 'array66',
//         fiftyormid: 'fifty'
//     },
//     {
//         combo: 'threex275',
//         plat: 'plat3',
//         array: 'array132',
//         fiftyormid: 'mid'
//     },
//     {
//         combo: 'fourx275',
//         plat: 'plat4',
//         array: 'array66',
//         fiftyormid: 'fifty'
//     },
//     //76
//     {
//         combo: 'fourx220',
//         plat: 'plat1',
//         array: 'array132',
//         fiftyormid: 'mid'
//     },
//     {
//         combo: 'fourx220',
//         plat: 'plat2',
//         array: 'array132',
//         fiftyormid: 'mid'
//     },
//     {
//         combo: 'fourx275',
//         plat: 'plat1',
//         array: 'array132',
//         fiftyormid: 'mid'
//     },

// ]

const possibleWorlds = keysOut;
console.log(keysOut)


export default function InputCard({ updateData }) {

    const initState = {
        combo: { 'HVDC': true, '4x220kV': true, '4x275kV': true, '3x275kV': true },
        plat: { '1 plat': true, '2 plat': true, '3 plat': true, '4 plat': true },
        array: { '66kV array': true, '132kV array': true },
        fiftyormid: { '50:50': true, 'Mid': true }
    }

    const initSelectedItems = {}
    for (let cat in cats) {
        initSelectedItems[cat] = null
    }

    const [currentState, setCurrentState] = useState(initState)
    const [selectedItems, setSelectedItems] = useState(initSelectedItems)


    function resetState() {
        setCurrentState(initState)
        setSelectedItems(initSelectedItems)
    }

    function getValidPossibleWorlds(mySelectedItems) {
        var validPossibleWorlds = []
        for (var world of possibleWorlds) {
            // this whole loop (below) should make valid == true if all of the parts of
            // the possible world align with the selected types
            let valid = true
            for (let type in cats) {
                if (!((world[type] === mySelectedItems[type]) | (mySelectedItems[type] === null))) {
                    // if our selected item aligns with this possible world
                    // then this part of the world is valid
                    valid = false
                    break
                }
            }
            if (valid) {
                validPossibleWorlds.push(world)
            }
        }
        return validPossibleWorlds
    }


    function pruneState(validPossibleWorlds, updatedState, mySelectedItems) {
        for (var type in cats) {
            var myItem = mySelectedItems[type]
            if (myItem === null) { // if it's null then we want to prune its state
                for (var actualItem in updatedState[type]) { // we want to iterate through all items in type's row
                    updatedState[type][actualItem] = false;
                    for (var world of validPossibleWorlds) { // for this item look through all the worlds
                        let worldlyItem = world[type]
                        if (actualItem === worldlyItem) {   // try to find ANY item from that world which matches
                            updatedState[type][actualItem] = true;
                            break;
                        }
                    }
                    // if we've looked through every world and there is nothing
                }
            }
        }
        return updatedState;
    }



    function updateState(type, actual) {
        // function called when a button is clicked
        // copies and sets the state objects selectedItem and currentState 

        // type : the category (row) to which the selected item belongs
        // actual: the actual selected item

        var updatedState = null
        var updatedItems = null
        if (selectedItems[type] === actual) { // this is the case where we are deselecting
            updatedState = { ...currentState };
            for (const key in updatedState[type]) {
                updatedState[type][key] = true;
            }
            updatedItems = {
                ...selectedItems,
                [type]: null
            }
        } else {

            updatedState = { ...currentState }; // this is where we are selecting
            for (const key in updatedState[type]) {
                if (key !== actual) {
                    updatedState[type][key] = false;
                } else {
                    updatedState[type][key] = true;
                }
            }
            updatedItems = {
                ...selectedItems,
                [type]: actual
            }
        }

        let validPossibleWorlds = getValidPossibleWorlds(updatedItems);
        let prunedState = pruneState(validPossibleWorlds, updatedState, updatedItems);

        setCurrentState(prunedState);
        setSelectedItems(updatedItems);

    }

    function readyToGo(mySelectedItems) {
        // returns true if and only if an item in each category has been selected
        for (let item in mySelectedItems) {
            if (mySelectedItems[item] === null) {
                return false;
            }
        }
        return true;
    }

    return (<div className='mb-4 mt-2 card border shadow-sm'>
        <div className='card-header'><h4>Select Layout</h4></div>
        {Object.keys(cats).map((item, index) => (
            <Select key={index} frontier={currentState} selItems={selectedItems} type={item} updateState={updateState} />
        ))}
        <div className='card-footer align-items-right'>
            <button onClick={resetState} className='mx-2 btn btn-secondary'>Reset</button>

            <button disabled={!readyToGo(selectedItems)} onClick={() => updateData(selectedItems)} className='mx-2 btn btn-success'>Go!</button>

        </div>
    </div>
    );
}

// frontier is a dict for each item in a category of the form, <item: bool>.
// it describes whether the item should be clickable given current state: 
function Select({ frontier, type, updateState, selItems }) {
    var selectedCat = cats[type]
    var selectedFrontier = frontier[type]

    return (
        <div className='row m-3'>
            <div className='col-2'>
                <label className='form-label' htmlFor={selectedCat.title}>{selectedCat.title}</label>
            </div>

            {selectedCat.types.map((item, index) => (
                < div key={index} className="col" >
                    {(selItems[type] === item) ? (
                        <button onClick={() => updateState(type, item)}
                            disabled={!selectedFrontier[item]}
                            className="w-100 btn btn-success ">{item}</button>) :

                        (
                            <button onClick={() => updateState(type, item)}
                                disabled={!selectedFrontier[item]}
                                className="w-100 btn btn-primary ">{item}</button>)
                    }

                </div>
            ))
            }
        </div >
    )
}
