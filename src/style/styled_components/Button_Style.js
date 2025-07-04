import styled from "styled-components";


// export const PrimaryButton = styled.button`
//     background-color: rgba(254, 241, 100, 1);
//     color: rgba(17, 24, 39, 1);
//     border: none;
//     border-radius: 0.375rem;
//     font-weight: 500;
//     transition: all 0.3s ease;

//     &:hover {
//         background-color: rgba(255, 246, 130, 1);
//         transform: scale(1.01);
//     }
// `;
// export const PrimaryButton = styled.button`
//     padding: 12px 20px;
//     font-size: 16px;
//     font-weight: 600;
//     border: none;
//     border-radius: 10px;
//     background-color: #fef164;
//     color: #1e1e1e;
//     cursor: pointer;
//     transition: background-color 0.3s ease;

//     &:hover {
//         background-color: #fff78f;
//     }

//     &:disabled {
//         background-color: #d4d4d4;
//         color: #888;
//         cursor: not-allowed;
//     }
// `;

// export const PrimaryButton = styled.button`
//     padding: 10px 20px;
//     font-size: 16px;
//     font-weight: 600;
//     border-radius: 999px;
//     border: none;
//     background-color: #f5e94a; /* 약간 투명도 줘서 부드러운 느낌 */
//     color: #1e1e1e;
//     cursor: pointer;
//     transition: all 0.3s ease;

//     &:hover {
//         background-color: #e9db45; /* hover도 투명하게 맞춤 */
//     }

//     &:active {
//         transform: scale(0.98);
//     }

//     &:disabled {
//         background-color: #d4d4d4;
//         color: #888;
//         cursor: not-allowed;
//     }
// `;

export const PrimaryButton = styled.button`
    font-size: 15px;
    font-weight: 600;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: rgba(254, 241, 100, 100);
    color: #1e1e1e;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
    background-color: rgba(255, 246, 130, 1);
        color: rgba(17, 24, 39, 1);
    }

    &:active {
        transform: scale(0.98);
    }

    &:disabled {
        background-color: #888;
        color: #ccc;
        cursor: not-allowed;
    }
`;

export const SecondaryButton = styled.button`
    font-size: 15px;
    font-weight: 600;
    padding: 10px 20px;
    border: none;
    background-color: #ffffff15;
    border: 1px solid #555;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #ffffff25;
        border: 1px solid #555;
    }
`;
export const SoftButton = styled.button`
    padding: 8px 20px;
    font-weight: 500;
    border-radius: 999px;
    background-color: #ffffff15;
    border: 1px solid #555;
    color: #fff;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: #ffffff25;
    }

    &:active {
        transform: scale(0.98);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;


export const FollowButton = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    background-color: #27a8fc;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);

    &:hover {
        background-color: #239be8;
    }

    &:active {
        transform: scale(0.97);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const FollowingButton = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    border: 1px solid #27a8fc;
    background-color: #1f1f1f;
    color: #27a8fc;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);

    &:hover {
        background-color: #252525 ;
        box-shadow: inset 0 0 0 1px #27a8fc88
    }
    

    &:active {
        transform: scale(0.97);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

// export const FlatButton = styled.button`
//   padding: 10px 24px;
//   font-size: 14px;
//   font-weight: 600;
//   color: #fff;
//   background-color: #555;
//   border: none;
//   border-radius: 9999px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #fef164;  /* 메인 컬러 */
//     color: #111;
//   }

//   &:active {
//     transform: scale(0.95);
//   }
// `;


// export const SecondaryButton = styled.button`
//     background-color: #ffffff15;
//     color: #fff;
//     border: 1px solid #555;
//     border-radius: 0.5rem;
//     transition: all 0.3s ease;
//     padding: 8px 16px

//     &:hover {
//         background-color: #ffffff25;
//     }
// `;

// const secondaryBtn=styled.button`
// borderRadius: '0.5rem',
// backgroundColor: '#ffffff15',
// border: '1px solid #555',
// color: '#fff', 
// padding: '8px 16px',
// transition: 'background-color 0.3s ease'
// `

export const DeleteButton = styled.button`
    background-color: #EF4444;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
        background-color: #DC2626;
        transform: scale(1.02);
    }
`;