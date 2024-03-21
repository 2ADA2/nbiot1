import { Page } from "../components/page"
import "../styles/pages/sources.css"

export const Sources = () => {
    return (
        <Page header="Sources" subHeader="Устройства" header2="Список устройств" elem ={
                <div className="table-container">
                
                <form>
                    <h3>Connection state</h3>
                    <section className="state">
                        <h5>Connection:</h5>
                        <h6>True</h6>
                    </section>
                    <button>Set State</button>
                </form>
                
                    <table>
                        <thead>
                            <tr>
                                <th>MAC Module</th>
                                <th>Date</th>
                                <th>Signal level</th>
                                <th>Battery level</th>
                                <th>Electronic unit temperature</th>
                                <th>Firmware version</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12</td>
                                <td>12</td>
                                <td>12</td>
                                <td>12</td>
                                <td>12</td>
                                <td>12</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        }/>
    )
}