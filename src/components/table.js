import { Table } from 'react-bootstrap';
import { HOST } from '../api/api';

export function TableComponent(props){
    console.log('props', props.shortURLData);
    const data = props.shortURLData.length && props.shortURLData.map((data) => {
        return(
            <tbody>
                <tr key = {data.id}>
                    <td>{data.id}</td>
                    <td>{data.longURL}</td>
                    <td>{`${HOST}/${data.shortURL}`}</td>
                    <td>{data.expiryDate}</td>
                    <td>{data.enablePassword ? 'true': 'false'}</td>
                    <td>{data.enableLogging ? 'true': 'false'}</td>
                    <td>{data.enableCustomization ? 'true': 'false'}</td>
                </tr>
            </tbody>
        );
    })
    console.log('DATA', data);
    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Long URL</th>
                        <th>Short URL</th>
                        <th>Expipry Date</th>
                        <th>Password Enabled</th>
                        <th>Logging Enabled</th>
                        <th>Customization Enabled</th>
                    </tr>
                </thead>
                {data}
            </Table>
        </div>
    );
}