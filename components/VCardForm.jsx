import QRCode from "qrcode-svg";
import { useEffect } from "react";

const VCardForm = ({data, handleChange, handleSubmit}) => {
    useEffect(()=>{
        if(data.link){
            var qrcode = new QRCode({
                content: `ragroup.org/${data.link}`,
                container: "svg-viewbox", //Responsive use
                join: true //Crisp rendering and 4-5x reduced file size
            });
            document.getElementById(`qr`).innerHTML = qrcode.svg();
        }
    }, [data.link])

    return (
        <div className="vcard-form">
            {!data.link ? (
                <div>
                    LOADING
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Link</label>
                            <input type="text" disabled name="link" value={data.link}/>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label>Firstname</label>
                                <input type="text" name="firstname" value={data.firstname} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Lastname</label>
                                <input type="text" name="lastname" value={data.lastname} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="email" value={data.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input type="text" name="website" value={data.website} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Mobile</label>
                            <input type="text" name="mobile" value={data.mobile} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <label>Organization</label>
                                <input type="text" name="organization" value={data.organization} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Workplace</label>
                                <input type="text" name="workplace" value={data.workplace} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <input type="text" name="country" value={data.country} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" value={data.city} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row-left">
                            <button className="btn submit" type="submit">Submit</button>
                        </div>
                    </form>
                    <div id="qr" style={{width: '256px'}}>

                    </div>
                </>
            )}    
        </div>
    );
};

export default VCardForm;