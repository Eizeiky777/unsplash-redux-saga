import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions';

import Stats from '../Stats';
import Button from '../Button';
import './styles.css';

class ImageGrid extends Component {

    // async componentDidMount() {
    //     try {
    //         const datas = await axios.get(`${URL}${KEY}&per_page=3&page=28`);
    //         // console.log(datas);
    //         // this.setState({images})
    //     } catch (error){
    //         console.error(error);
    //     }
    // }

    render() {
        const { images, error, isLoading, loadImages, imageStats } = this.props
        console.log(images)
        return (
            <div className="content">
                <section className="grid">
                    {images.length !== 0 && images.map(image => (
                        <div
                            key={image.id}
                            className={`item item-${Math.ceil(
                                image.height / image.width,
                            )}`}
                        >
                            <Stats stats={imageStats[image.id]} />
                            <img
                                src={image.urls.small}
                                alt={image.user.username}
                            />
                        </div>
                    ))}
                </section>
                    
                <Button 
                    onClick={() => !isLoading && loadImages() }
                    loading={isLoading}
                >
                    Load more
                </Button>
                {error && <div className="error">{JSON.stringify(error)}</div>}
            </div>
        );
    }
}

const mapStateToProps = ({ isLoading, images, error, imageStats }) => ({
    isLoading,
    images,
    error,
    imageStats
});

const mapDispatchToProps = dispatch => ({
    loadImages: () => dispatch(loadImages()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageGrid);
