import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');

interface BannerItem {
  id: number;
  image?: string;
  backgroundColor?: string;
}

interface CustomBannerSliderProps {
  banners: BannerItem[]; // Accept banners as a prop
}

const CustomBannerSlider: React.FC<CustomBannerSliderProps> = ({banners}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % banners.length;
        scrollViewRef.current?.scrollTo({x: nextIndex * width, animated: true});
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  // Manual Scroll: Update activeIndex on scroll
  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / width); // Round to nearest integer
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false, listener: handleScroll},
        )}
        scrollEventThrottle={16}>
        {banners.map(banner => (
          <View
            key={banner.id}
            style={[
              styles.bannerImage,
              {backgroundColor: banner.backgroundColor || '#ccc'},
            ]}>
            {banner.image && (
              <Image source={{uri: banner.image}} style={styles.image} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, {opacity: index === activeIndex ? 1 : 0.3}]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  bannerImage: {
    width: width,
    height: 200,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});

export default CustomBannerSlider;
