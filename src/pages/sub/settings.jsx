import {Page} from "../../components/page"
import "../../styles/pages/settings.css";
import {useEffect, useState} from "react";
import global from "../../store/global";
import {observer} from "mobx-react-lite";
import {FormattedMessage} from "react-intl/lib";
import {Counter} from "../../components/counter";
import {CheckBox} from "../../components/checkbox";
import axios from "axios";
import {sendCmd} from "../../functions/cmd";
import {connect} from "../../functions/connect";


export const SettingsSub = observer(() => {
    const [state, setState] = useState(global.settings.State);
    const [temperature, setTemperature] = useState(global.settings.Temperature);
    const [encryptionState, setEncryptionState] = useState(global.settings["Encryption state"] || false);
    const [fifoState, setFifoState] = useState(global.settings["FIFO State"] || false);
    const [macAddr, setMacAddr] = useState(global.settings["MAC addr"]);
    const [swVersion, setSwVersion] = useState(global.settings["SW version"]);
    const [localTime, setLocalTime] = useState(global.settings["Local time"]);
    const [addrRS485, setAddrRS485] = useState(global.settings["Addr RS485"] || 1);
    const [addrSUB, setAddrSUB] = useState(global.settings["Addr SUB"] || 1);
    const [subChannel, setSubChannel] = useState(global.settings["SUB channel"] || 1);
    const [subSpeed, setSubSpeed] = useState(global.settings["SUB speed"] || 50);
    const [syncWord, setSyncWord] = useState(global.settings["Sync word"]);
    const [txPower, setTxPower] = useState(global.settings["TX Power"]);
    const [keyAES128, setKeyAES128] = useState("");
    const [countRXFIFO, setCountRXFIFO] = useState(global.settings["Count RX FIFO"]);
    const [countOverflowRXFIFO, setCountOverflowRXFIFO] = useState(global.settings["Count overflow RX FIFO"]);
    const [countCRCError, setCountCRCError] = useState(global.settings["CRC Error"] || 0);
    const [peketCount, setPeketCount] = useState(global.settings["Peket count"]);
    const [numTXFIFO, setNumTXFIFO] = useState(global.settings["Num TX FIFO"]);
    const [typeLastTXRequest, setTypeLastTXRequest] = useState(global.settings["Type last TX request"]);
    const [countTXFIFO, setCountTXFIFO] = useState(global.settings["Count TX FIFO"]);

    const [txFifo, setTxFifo] = useState(false);
    const [rxFifo, setRxFifo] = useState(false);
    const [syncTime, setSyncTime] = useState(false);
    const [cmdCount, setCmdCount] = useState(0);

    useEffect(() => {
        console.log(cmdCount)
    },[cmdCount])

    const sendParams = (e) => {
        e.preventDefault()
        setCmdCount(1)
        axios.post(global.subWay + "/gw settings", {
                GW_Settings: {
                    "Addr RS485": addrRS485,
                    "Addr SUB": addrSUB,
                    "Sub_channel": subChannel,
                    "SUB speed": subSpeed,
                    "Sync word": syncWord,
                    "TX Power": txPower,
                    "Key AES128": keyAES128,
                    "FIFO filter": fifoState,
                    "Encryption": encryptionState

                }
            },
            {headers: {"Authorization": global.token}})
            .then(res => waitCMD())
            .catch((e) => global.catchError(e))
    }

    const waitCMD = async () => {
        const cmdInterval = setInterval(() => {
            connect(global.subWay + "/cmd execution state", global.token)
                .then((res) => {
                    if (res.data.Info !== "execution" || cmdCount) {
                        console.log("clear:" + res.data.Info + cmdCount)
                        clearInterval(cmdInterval)
                        setCmdCount(0)
                    }
                }).catch(e => global.catchError(e))
        }, 5000)
    }

    const reset = (e) => {
        e.preventDefault()
        if(rxFifo)sendCmd(global.subWay + "/clear RX FIFO", global.token)
        if (txFifo)sendCmd(global.subWay + "/clear TX FIFO", global.token)

        if(rxFifo || txFifo){
            setCmdCount(1)
            waitCMD()
        }
    }

    const cmdSyncTime = (e) => {
        e.preventDefault()
        setCmdCount(1)
        sendCmd(global.subWay + "/synchronize time", global.token).then(() => waitCMD())

    }

    return (
        <Page
            header={<FormattedMessage id="settings.header"/>}
            header2={<FormattedMessage id="settings.sub.header2"/>}
            elem={
                <form>
                    <section className={"connedtion-details"}>
                        <h3>
                            <FormattedMessage id="settings.sub.main.header"/>
                        </h3>

                        <label>
                            <h5>State</h5>
                            <h5>{state}</h5>
                        </label>

                        <label>
                            <h5>Temperature</h5>
                            <h5>{temperature}</h5>
                        </label>

                        <label>
                            <h5>MAC addr</h5>
                            <h5>{macAddr}</h5>
                        </label>
                        <label>
                            <h5>SW version</h5>
                            <h5>{swVersion}</h5>
                        </label>
                        <label>
                            <h5>Local time</h5>
                            <h5>{localTime}</h5>
                        </label>

                        <h3>
                            <FormattedMessage id="settings.sub.change.header"/>
                        </h3>

                        <label>
                            <h5>Synchronize time</h5>
                            <button style={{margin: 0}}
                                    onClick={(e) => cmdSyncTime(e)}
                                    className={(cmdCount) ? "activated-button" : ""}>
                                Synchronize
                            </button>
                        </label>

                        <label>
                            <h5>Addr RS485</h5>
                            <Counter count={addrRS485}
                                     newCount={(num) => {
                                         (num < 1) ?
                                             setAddrRS485(1) : (num > 254) ? setAddrRS485(254) : setAddrRS485(num)
                                     }}
                                     setCount={(num) => (addrRS485 + num > 0 && addrRS485 + num < 255) ? setAddrRS485(addrRS485 + num) : setAddrRS485(addrRS485)}
                            />
                        </label>

                        <label>
                            <h5>Addr SUB</h5>
                            <Counter count={addrSUB}
                                     newCount={(num) => {
                                         (num < 1) ?
                                             setAddrSUB(1) : (num > 254) ? setAddrSUB(254) : setAddrSUB(num)
                                     }}
                                     setCount={(num) => (addrSUB + num > 0 && addrSUB + num < 255) ? setAddrSUB(addrSUB + num) : setAddrSUB(addrSUB)}
                            />
                        </label>

                        <label>
                            <h5>SUB chanel</h5>
                            <Counter count={subChannel}
                                     newCount={(num) => {
                                         (num < 1) ?
                                             setSubChannel(1) : (num > 85) ? setSubChannel(85) : setSubChannel(num)
                                     }}
                                     setCount={(num) => (subChannel + num > 0 && subChannel + num < 86) ? setSubChannel(subChannel + num) : setSubChannel(subChannel)}
                            />

                        </label>

                        <label>
                            <h5>Sync word</h5>
                            <input type="text" value={syncWord} onChange={(e) => setSyncWord(e.target.value)}/>
                        </label>

                        <label>
                            <h5>Key AES128</h5>
                            <input type="text" value={keyAES128}
                                   onChange={(e) => setKeyAES128(e.target.value)}/>
                        </label>
                        <label>
                            <h5>TX Power</h5>
                            <select defaultValue={txPower} onChange={(e) => setTxPower(e.target.value)}>
                                <option value={-20}>-20</option>
                                <option value={-15}>-15</option>
                                <option value={-10}>-10</option>
                                <option value={-5}>-5</option>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                // временно
                                <option value={12}>12</option>
                                <option value={12.5}>12.5</option>
                                <option value={14}>14</option>
                            </select>
                        </label>

                        <label>
                            <h5>SUB speed</h5>
                            <select defaultValue={subSpeed} onChange={(e) => setTxPower(e.target.value)}>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </label>
                        {/*<label>*/}
                        {/*    <h5>Frequency SUB</h5>*/}
                        {/*    <input type="text" value={frequencySUB} onChange={(e) => setFrequencySUB(e.target.value)}/>*/}
                        {/*</label>*/}
                        {/*<label>*/}
                        {/*    <h5>Frequency Divider</h5>*/}
                        {/*    <input type="text" value={frequencyDivider}*/}
                        {/*           onChange={(e) => setFrequencyDivider(e.target.value)}/>*/}
                        {/*</label>*/}
                        <label>
                            <h5>FIFO State</h5>
                            <CheckBox checked={fifoState} setValue={() => setFifoState(!fifoState)}/>
                        </label>

                        <label>
                            <h5>Encryption state</h5>
                            <CheckBox checked={encryptionState} setValue={() => setEncryptionState(!encryptionState)}/>
                        </label>
                        <button
                            style={{marginTop: 20}}
                            onClick={(e) => sendParams(e)}
                            className={(cmdCount) ? "activated-button" : ""}
                        >
                            <FormattedMessage id="settings.button"/>
                        </button>

                        <h3>
                            <FormattedMessage id="settings.sub.checkbox.header"/>
                        </h3>

                        <label className={"triple-label"}>
                            <h5>Count RX FIFO</h5>
                            <h5 style={{minWidth: 50}}>
                                {countRXFIFO}
                            </h5>
                            <CheckBox checked={rxFifo} setValue={() => setRxFifo(!rxFifo)}/>
                        </label>
                        <label  className={"triple-label"}>
                            <h5>Count TX FIFO</h5>
                            <h5 style={{minWidth: 50}}>
                                {countTXFIFO}123
                            </h5>
                            <CheckBox checked={txFifo} setValue={() => setTxFifo(!txFifo)}/>
                        </label>

                        <label>
                            <h5>Count overflow RX FIFO</h5>
                            <h5>
                                {countOverflowRXFIFO}
                            </h5>
                        </label>
                        <label>
                            <h5>Count CRC Error</h5>
                            <h5>
                                {countCRCError}
                            </h5>
                        </label>
                        <label>
                            <h5>Peket count</h5>
                            <h5>
                                {peketCount}
                            </h5>
                        </label>
                        {/*<label>*/}
                        {/*    <h5>Type last TX request</h5>*/}
                        {/*    <input type="text" value={typeLastTXRequest}*/}
                        {/*           onChange={(e) => setTypeLastTXRequest(e.target.value)}/>*/}
                        {/*</label>*/}

                    </section>
                    <button
                        onClick={(e) => reset(e)}
                        className={(cmdCount) ? "activated-button center-button" : "center-button"}
                    >
                        <FormattedMessage id="settings.resetButton"/>
                    </button>
                </form>
            }
        />
    )
})