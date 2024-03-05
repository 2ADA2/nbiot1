import res from "./res.json"
import "../styles/components/page.css"

export const Page = () => {
    const device = res.Device;
    const deviceAttr = res.DeviceAttr;
    const metrics = res.DeviceAttr.Metrics;
    return (
        <section className = "container">
            
            <div className="page">
                <h2>Device</h2>
                <section className="section">
                    <div className="device">
                        <div className="row">
                            <h3>Board Rev:</h3><span>{device["BoardRev."]||"none"}</span>
                        </div>
                        <div className="row">
                            <h3>Dev Id:</h3><span>{device["DevId"]||"none"}</span>
                        </div>
                        <div className="row">
                            <h3>Dev Name:</h3><span>{device["DevName"]||"none"}</span>
                        </div>
                        <div className="row">
                            <h3>Proto Ver:</h3><span>{device["ProtoVer"]||"none"}</span>
                        </div>
                        <div className="row">
                            <h3>Soft Ver:</h3><span>{device["SoftVer"]||"none"}</span>
                        </div>
                        
                    </div>
                </section>
                <h2>Device Attributes</h2>
                <section className="section">
                    <div className="device-attr">

                        <section className="info">
                            <div className="row">
                                <h3>Configured:</h3><span>{String(deviceAttr["Configured"])||"none"}</span>
                            </div>
                            <div className="row">
                                <h3>Link Repeat:</h3><span>{String(deviceAttr["LinkRepeat"])||"none"}</span>
                            </div>
                            <div className="row">
                                <h3>Registered:</h3><span>{String(deviceAttr["Registered"])||"none"}</span>
                            </div>
                            <div className="row">
                                <h3>State:</h3><span>{String(deviceAttr["State"])||"none"}</span>
                            </div>
                            <div className="row">
                                <h3>Local Time:</h3><span>{deviceAttr["localTime"]||"none"}</span>
                            </div>
                        </section>

                        <section className="info">
                            <div className="row">
                                <h3>Battery:</h3><span>{deviceAttr["localTime"]||"none"}</span>
                            </div>
                            <div className="row">
                                <h3>GSM Siglevel:</h3><span>{deviceAttr["localTime"]||"none"}</span>
                            </div>
                            <div className="row">
                                <h3>Mode:</h3><span>{deviceAttr["localTime"]||"none"}</span>
                            </div>
                        </section>

                    </div>
                </section>
            </div>
        </section>
    )
}