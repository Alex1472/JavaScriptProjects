import { useState } from "react";

const AddTask = ({ addTask }) => {
    const [text, SetName] = useState("");
    const [day, SetDayTime] = useState("");
    const [reminder, SetReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!text) {
            alert("Set task");
            return;
        }
        let task = { text, day, reminder };
        SetName("");
        SetDayTime("");
        SetReminder(false);
        addTask(task)
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Set task" value={text} onChange={(e) => SetName(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" placeholder="Set Day & Time" value={day} onChange={(e) => SetDayTime(e.target.value)}/>
            </div>
            <div className="form-control form-control-check">
                <label>Reminder</label>
                <input type="checkbox" value={reminder} checked={reminder} onChange={(e) => SetReminder(e.currentTarget.checked)} />
            </div>
            <input type="submit" className="btn btn-block" placeholder="Send" />
        </form>
    )
}

export default AddTask;