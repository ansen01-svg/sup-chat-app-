import { BiUser } from "react-icons/bi";

let UsersComponent = ({data, selectedChat}) => {

    return (
        <div className='contacts'>
        {
            data.map((item, index) => {
                let { id : { _id, username, profile_picture, about } } = item

                return (
                    <div className='each_holder' key={index} 
                    onClick={() => selectedChat(_id)}>
                        <div className='each_pic'>
                        {
                            profile_picture ?
                            <img src={profile_picture} alt='sorry' className='profile_img' />
                            :
                            <BiUser className='profile_icon' />
                        }
                        </div>
                        <div className='each_rest'>
                            <p>{username}</p>
                            <p className='about_p'>{about}</p>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )

}


export default UsersComponent;