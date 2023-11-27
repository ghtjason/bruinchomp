import {Button} from '@mui/material'

const Create = () => {
    return (
        <div className="createPost">
            <h2>Create new post</h2>
            <form>
                <div>
                    <label>Post title</label>
                    <input 
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label>Post category</label>
                    <select>
                        <option value="Bruin_Plate">Bruin Plate</option>
                        <option value="Epicuria">Epicuria</option>
                        <option value="De_Neve">De Neve</option>
                        </select>
                </div>
                <div>
                    <label>Post body</label>
                    <textarea required>
                </textarea>
                </div>

            </form>

            <Button variant="outlined">Add Post</Button>
        </div>
    )
}

export default Create;