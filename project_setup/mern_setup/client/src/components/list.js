// import React , {Component} from 'react';
// import listData from '../dummy_data/list';

// class List extends Component {

//     constructor(props){
//         super(props);

//         this.state = {
//             list: []
//         }
//     }

//     componentDidMount () {
//         this.getListData ();
//     }

//     getListData () {
//         //Call server to get data
//         this.setState ({
//             list: listData
//         });
//     }

//     render () {
//         console.log('state: ', this.state.list);

//         const listElements = this.state.list.map( (item,index) => {
//             return (
//                 <ul key={item.id}>
//                     <li>{item.term}</li>
//                     <li>{item.definition}</li>
//                 </ul>
//                 );
//         } );
        


//         return (
//             <div>
//                 {listElements}

//             </div>
//         );
//     }
// }

// export default List;