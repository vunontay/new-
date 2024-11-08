import "./index.css";
import tagsData from "../../data/tagList.json";
import categoriesData from "../../data/categories.json";
import detailData from "../../data/detail.json";
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import { Swiper, SwiperSlide } from "swiper/react";

function DetailPage() {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [record, setRecord] = useState(detailData);
  const { id } = useParams();

  useEffect(() => {
    setCategories(categoriesData.data.record);
  }, []);

  useEffect(() => {
    setTags(tagsData.data.record);
  }, []);

  useEffect(() => {
    setRecord(detailData.data.record);
  }, []);

  return (
    <>
      <div className="detail-page">
        <h1 className="detail-page__title">{record?.title}</h1>
        <p className="detail-page__meta">
          {record.author?.username} - ngày{" "}
          {new Date().toLocaleDateString("vi-VN")}
        </p>

        <div className="detail-page__image-container">
          <img
            className="detail-page__image"
            src="/image 1.png"
            alt="Post Thumbnail"
          />
        </div>

        <div
          className="detail-page__description"
          dangerouslySetInnerHTML={{ __html: record.content }}
        />

        <div className="detail-page__tags">
          <div className="detail-page__tags-type">
            <h2 className="detail-page__tags-header">THỂ LOẠI</h2>
            {/* Render categories dynamically */}
            <div className="detail-page__categories">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="detail-page__tags-button-default"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Render tags dynamically */}
          <div className="detail-page__tags-card">
            <h2 className="detail-page__tags-header">THẺ</h2>
            <div className="detail-page__tags-buttons">
              {tags.map((post) => (
                <Button
                  key={post.id}
                  className="detail-page__tags-button"
                  variant="outline"
                >
                  {post.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Swiper Slider for Cards */}

      <div>
        <div className="detail-list">
          <Swiper
            spaceBetween={40}
            slidesPerView={3}
            loop={true}
            className="detail-list__wrapper"
            // breakpoints={{
            //   640: {
            //     slidesPerView: 1,
            //     spaceBetween: 10,
            //   },
            //   768: {
            //     slidesPerView: 2,
            //     spaceBetween: 10,
            //   },
            //   1024: {
            //     slidesPerView: 3,
            //     spaceBetween: 20,
            //   },
            // }}
          >
            {tags.map((card, index) => (
              <SwiperSlide key={index}>
                <Card {...card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
