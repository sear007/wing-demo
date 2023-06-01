const Alerts = ({ errors, notification }) => {
    return ( 
        <div className="p-3">
            {notification && <p className="text-success my-2">{notification}</p>}
            {errors?.map((error, key) => (<span key={key} className="d-block small text-danger my-2">{error}</span>))}
        </div>
    );
}
 
export default Alerts;