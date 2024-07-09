import {Page} from "../../components/page"
import "../../styles/pages/settings.css";
import {CheckBox} from "../../components/checkbox";
import {useState} from "react";
import {Counter} from "../../components/counter";
import global from "../../store/global";
import {observer} from "mobx-react-lite";
import {setSettings} from "../../functions/requests";
import {FormattedMessage} from "react-intl/lib";


export const SettingsSub = observer(() => {
    const [state, setState] = useState("");
    const [temperature, setTemperature] = useState("");
    const [encryptionState, setEncryptionState] = useState("");
    const [fifoState, setFifoState] = useState("");
    const [macAddr, setMacAddr] = useState("");
    const [swVersion, setSwVersion] = useState("");
    const [localTime, setLocalTime] = useState("");
    const [addrRS485, setAddrRS485] = useState("");
    const [addrSUB, setAddrSUB] = useState("");
    const [subChannel, setSubChannel] = useState("");
    const [subSpeed, setSubSpeed] = useState("");
    const [syncWord, setSyncWord] = useState("");
    const [txPower, setTxPower] = useState("");
    const [frequencySUB, setFrequencySUB] = useState("");
    const [frequencyDivider, setFrequencyDivider] = useState("");
    const [countRXFIFO, setCountRXFIFO] = useState("");
    const [countOverflowRXFIFO, setCountOverflowRXFIFO] = useState("");
    const [countCRCError, setCountCRCError] = useState("");
    const [packetCount, setPacketCount] = useState("");
    const [numTXFIFO, setNumTXFIFO] = useState("");
    const [typeLastTXRequest, setTypeLastTXRequest] = useState("");
    const [countTXFIFO, setCountTXFIFO] = useState("");

    return (
        <Page
            header={<FormattedMessage id="settings.header"/>}
            subHeader={"GW settings"}
            header2={<FormattedMessage id="settings.sub.header2"/>}
            elem={
                <form>
                    <h3>
                        <FormattedMessage id = "settings.sub.main.header"/>
                    </h3>
                    <section className={"connedtion-details"}>
                        <label>
                            <h5>State</h5>
                            <input type="text" value={state} onChange={(e) => setState(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Temperature</h5>
                            <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Encryption state</h5>
                            <input type="text" value={encryptionState}
                                   onChange={(e) => setEncryptionState(e.target.value)}/>
                        </label>
                        <label>
                            <h5>FIFO State</h5>
                            <input type="text" value={fifoState} onChange={(e) => setFifoState(e.target.value)}/>
                        </label>

                        <h3>
                            <FormattedMessage id="settings.sub.network.header"/>
                        </h3>
                        <label>
                            <h5>MAC addr</h5>
                            <input type="text" value={macAddr} onChange={(e) => setMacAddr(e.target.value)}/>
                        </label>
                        <label>
                            <h5>SW version</h5>
                            <input type="text" value={swVersion} onChange={(e) => setSwVersion(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Local time</h5>
                            <input type="text" value={localTime} onChange={(e) => setLocalTime(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Addr RS485</h5>
                            <input type="text" value={addrRS485} onChange={(e) => setAddrRS485(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Addr SUB</h5>
                            <input type="text" value={addrSUB} onChange={(e) => setAddrSUB(e.target.value)}/>
                        </label>
                        <label>
                            <h5>SUB chanel</h5>
                            <input type="text" value={subChannel} onChange={(e) => setSubChannel(e.target.value)}/>
                        </label>
                        <label>
                            <h5>SUB speed</h5>
                            <input type="text" value={subSpeed} onChange={(e) => setSubSpeed(e.target.value)}/>
                        </label>

                        <h3>
                            <FormattedMessage id="settings.sub.sync.header"/>
                        </h3>
                        <label>
                            <h5>Sync word</h5>
                            <input type="text" value={syncWord} onChange={(e) => setSyncWord(e.target.value)}/>
                        </label>
                        <label>
                            <h5>TX Power</h5>
                            <input type="text" value={txPower} onChange={(e) => setTxPower(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Frequency SUB</h5>
                            <input type="text" value={frequencySUB} onChange={(e) => setFrequencySUB(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Frequency Divider</h5>
                            <input type="text" value={frequencyDivider}
                                   onChange={(e) => setFrequencyDivider(e.target.value)}/>
                        </label>

                        <h3>
                            <FormattedMessage id="settings.sub.sync.header"/>
                        </h3>
                        <label>
                            <h5>Count RX FIFO</h5>
                            <input type="text" value={countRXFIFO} onChange={(e) => setCountRXFIFO(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Count overflow RX FIFO</h5>
                            <input type="text" value={countOverflowRXFIFO}
                                   onChange={(e) => setCountOverflowRXFIFO(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Count CRC Error</h5>
                            <input type="text" value={countCRCError}
                                   onChange={(e) => setCountCRCError(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Peket count</h5>
                            <input type="text" value={packetCount} onChange={(e) => setPacketCount(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Num TX FIFO</h5>
                            <input type="text" value={numTXFIFO} onChange={(e) => setNumTXFIFO(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Type last TX request</h5>
                            <input type="text" value={typeLastTXRequest}
                                   onChange={(e) => setTypeLastTXRequest(e.target.value)}/>
                        </label>
                        <label>
                            <h5>Count TX FIFO</h5>
                            <input type="text" value={countTXFIFO} onChange={(e) => setCountTXFIFO(e.target.value)}/>
                        </label>
                    </section>
                    <button onClick={(e) => e.preventDefault()}>
                        <FormattedMessage id="settings.button"/>
                    </button>
                </form>
            }
        />
    )
})