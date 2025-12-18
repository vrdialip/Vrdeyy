import { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div className="scroll-stack-card-wrapper">
        <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
    </div>
);

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete
}) => {
    const scrollerRef = useRef(null);
    const endRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef(null);
    const lenisRef = useRef(null);
    const itemRefs = useRef([]); // Wrappers
    const cardRefs = useRef([]); // Actual cards being transformed
    const initialTopsRef = useRef([]);
    const initialEndTopRef = useRef(0);
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback((scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller.scrollTop,
                containerHeight: scroller.clientHeight,
            };
        }
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        element => {
            if (!element) return 0;
            if (useWindowScroll) {
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                return element.offsetTop;
            }
        },
        [useWindowScroll]
    );

    const measurePositions = useCallback(() => {
        initialTopsRef.current = itemRefs.current.map(item => getElementOffset(item));
        initialEndTopRef.current = getElementOffset(endRef.current);
    }, [getElementOffset]);

    const updateCardTransforms = useCallback(() => {
        if (!cardRefs.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
        const endElementTop = initialEndTopRef.current;

        cardRefs.current.forEach((card, i) => {
            if (!card) return;

            const cardInitialTop = initialTopsRef.current[i];
            if (cardInitialTop === undefined) return;

            const triggerStart = cardInitialTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardInitialTop - scaleEndPositionPx;
            const pinStart = cardInitialTop - stackPositionPx - itemStackDistance * i;
            // The cards release based on the scroll position relative to the end element
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = -1;
                for (let j = 0; j < initialTopsRef.current.length; j++) {
                    const jTriggerStart = initialTopsRef.current[j] - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardInitialTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardInitialTop + stackPositionPx + itemStackDistance * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardRefs.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        onStackComplete,
        calculateProgress,
        parsePercentage,
        getScrollData
    ]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        const lenis = new Lenis({
            wrapper: useWindowScroll ? undefined : scrollerRef.current,
            content: useWindowScroll ? undefined : scrollerRef.current.querySelector('.scroll-stack-inner'),
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.075
        });

        lenis.on('scroll', handleScroll);

        const raf = time => {
            lenis.raf(time);
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);

        lenisRef.current = lenis;
        return lenis;
    }, [handleScroll, useWindowScroll]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const items = Array.from(scroller.querySelectorAll('.scroll-stack-card-wrapper'));
        const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));

        itemRefs.current = items;
        cardRefs.current = cards;

        items.forEach((item, i) => {
            if (i < items.length - 1) {
                item.style.marginBottom = `${itemDistance}px`;
            }
        });

        cards.forEach((card, i) => {
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.zIndex = `${i + 1}`;
        });

        measurePositions();
        const lenis = setupLenis();
        updateCardTransforms();

        const resizeObserver = new ResizeObserver(() => {
            measurePositions();
            updateCardTransforms();
        });
        resizeObserver.observe(scroller);

        return () => {
            resizeObserver.disconnect();
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (lenis) {
                lenis.destroy();
            }
            stackCompletedRef.current = false;
            isUpdatingRef.current = false;
            lastTransformsRef.current.clear();
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        setupLenis,
        updateCardTransforms,
        measurePositions
    ]);



    return (
        <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
            <div className="scroll-stack-inner">
                {children}
                <div className="scroll-stack-end" ref={endRef} />
            </div>
        </div>
    );
};

export default ScrollStack;
