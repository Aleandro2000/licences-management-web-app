export default function Pannel(props) {
    switch (props.type) {
        case "student":
            return (
                <div className="container mt-5">
                    <select className="form-select" defaultValue={""} id="type" name="type">
                        <option value="">SELECT UNIVERSITY</option>
                        <option value="upb">UPB</option>
                        <option value="ase">ASE</option>
                        <option value="unibuc">UniBuc</option>
                        <option value="utcb">UTCB</option>
                    </select>
                </div>
            );
        case "teacher":
            return (
                <div className="container">
                </div>
            );
        default:
            return (
                <>
                </>
            );
    }
}