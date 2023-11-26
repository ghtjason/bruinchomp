import { Grid, Stack, Button } from '@mui/material'
import { useState } from "react";

 const Posts = () => {

    //Get from backend server later
    //Can maybe try to search by post?
    const [posts, setPosts] = useState(
        [
            {title: 'Bruin Plate', Post_category: 'Bruin_Plate', Post_body: 'lorem iosum', Post_image: 'https://bruinplate.hh.ucla.edu/img/Home_Slide_MOC.jpg', author: 'Bob', id: 1},
            {title: 'Epicuria', Post_category: 'Epicuria', Post_body: 'lorem iosum', Post_image: 'https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_EpicuriaAckerman2.png', author: 'John', id: 2},
            {title: 'De Neve', Post_category: 'De_Neve', Post_body: 'lorem iosum', Post_image: 'https://portal.housing.ucla.edu/sites/default/files/media/images/DiningWebsite_HeaderImages_DeNeve.png', author: 'Smith', id: 3}    
        ]
    )
    return (
        <Stack>
        <div className="Posts">
            {posts.map((post) => (
                <div className="post-preview" key={posts.id}>
                    <h2>{post.title}</h2>
                    <div className="image"> 
                    <img
                    src={post.Post_image}
                    alt={post.Post_title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    </div>
                    <p>{post.author}</p>
                    <div className="buttons">

                        <Button variant="outlined">Comment</Button>
                        <Button variant="outlined">Like</Button>
                        <Button variant="outlined">Save</Button>

                    </div>
                </div>
            ))}
        </div>

        </Stack>
    )
}

export default Posts