export const sliderSettings = {
  dots: true,
  speed: 500,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

export const blockChainItems = [
  {
    label: 'Polygon',
    value: 'Polygon',
  },
  {
    label: 'Ethereum',
    value: 'Ethereum',
  },
]

export const REACT_APP_LIT_GATEWAY_LIT_OG_NFT_TOKEN_ADDRESS =
  process.env.REACT_APP_LIT_GATEWAY_LIT_OG_NFT_TOKEN_ADDRESS
