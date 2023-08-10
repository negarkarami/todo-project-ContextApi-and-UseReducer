import {useContext, useState} from "react";
import TodoContext from "../../context/TodoContext";

const FilterToDos = () => {
    const {filterTodo} = useContext(TodoContext)
    const [loading, setLoading] = useState(false)

    
    const handleFilter = async (e) => {
        setLoading(true)
        await filterTodo(e.target.value)
        setLoading(false)
    }

    return(
        <div className='col-md-12'>
            <div className='row'>
                <div className='col-md-2'>
                    <h4>Filter</h4>
                    <select className='form-select form-select-sm' onChange={(e) => handleFilter(e)}>
                        <option value='100'>all</option>
                        <option value='3'>3</option>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='30'>30</option>
                        <option value='60'>60</option>
                        <option value='80'>80</option>
                        <option value='100'>100</option>
                    </select>
                    {
                        loading &&
                            <div className='spinner-border spinner-border-sm'></div>
                    }
                </div>
            </div>
        </div>
    )

}

export default FilterToDos