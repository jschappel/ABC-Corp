import React, { Component } from 'react'

class EquipmentModal extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            model_title: null,
            model_number: null,
            serial_number: null,
            warranty_end: null,
            lease_start: null,
            lease_end: null,
            office_name: null,
            floor: null,
            room: null,
            vendor_name: null,
        }
    }

    /**
     * componentDidMount: Fetches the necessary data from the API so that the table can be rendered
     */
    componentDidMount(){
        fetch('/graphql',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: equipmentFetch(this.props.eqId),
        })
        .then( results => results.json())
        .then( ({data}) => {
            const tableData = data.equipmentSingle
            console.log(tableData)
            this.setState({
                modal_title: tableData.model.model_name,
                model_number: tableData.model.model_number,
                serial_number: tableData.serial_number,
                warranty_end: tableData.warranty_end_date,
                lease_start: tableData.lease.lease_start,
                lease_end: tableData.lease.lease_end,
                office_name: tableData.room.office.office,
                floor: tableData.room.floor,
                room: tableData.room.room,
                vendor_name: tableData.vendor.name,
            })
        })
    }

    render() {
        return(
            <div 
             className={`modal ${this.props.showModal ? 'show' : ''}`} 
                style={{display: `${this.props.showModal ? 'block' : 'none'}`, backgroundColor: 'rgb(0,0,0,.8)'}}
                tabIndex="-1" 
                role="dialog" 
                aria-label="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.state.model_title}</h5>
                            <button type="button" className="close" onClick={() => this.props.toggleModal()} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Body goes below</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * equipmentFetch: Fetches data about a piece of equipment from the GraphQL API
 * @param {String} id The id of the piece of equipment that you wish to query from the database
 * @return {String} A string containing the JSON object
 */
const equipmentFetch = (id) => {
    return JSON.stringify({
        query : `query{
            equipmentSingle(id: ${id}){
              serial_number
              active
              warranty_end_date
              lease{
                lease_start
                lease_end
              }
              model{
                model_name
                model_number
              }
              vendor {
                name
              }
              room {
                room
                floor
                office {
                  office
                }
              }
            }
          }`
    })
}

export default EquipmentModal