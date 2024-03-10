import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import Fade from 'react-reveal';
import Slider from "react-slick";
import DetailContent from './DetailContent';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Row = ({
  actions,
  adventures,
  comedys,
  documentarys,
  familys,
  fantasys,
  horrors,
  populars,
}) => {

  const RightArrow = (props) => {
    const { onClick } = props;
  return (
      <div
        className='slick_button'
        style={{ marginLeft: '99%' }}
        onClick={onClick}
      ><Icon.ChevronCompactRight style={{height: '100%'}} /></div>
    );
  }
  
  const LeftvArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className='slick_button'
        onClick={onClick}
      ><Icon.ChevronCompactLeft style={{height: '100%'}} /></div>
    );
  }
  const settings = {  
    infinite : true,
    slidesToShow : 1,
    slidesToScroll : 5,
    variableWidth : true,
    nextArrow: <RightArrow />,
    prevArrow: <LeftvArrow />
  };
  return (
    <div>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Recommended</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {populars
                  ? populars.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
              </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Action</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {actions
                  ? actions.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
              </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Adventure</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {adventures
                  ? adventures.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
              </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Comedy</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {comedys
                  ? comedys.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
              </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Documentary</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {documentarys
                  ? documentarys.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
              </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Family</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {familys
                  ? familys.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Fantasy</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {fantasys
                  ? fantasys.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
              </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Horror</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {horrors
                  ? horrors.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
              </div>
            </div>
          </div>
        </Fade>
    </div>
  );
};
export default Row;
