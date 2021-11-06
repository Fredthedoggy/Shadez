import React, { useState } from 'react';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-components';

export default function Dropdown({
    items,
    selected,
    filler,
    onChange,
}: {
    items: (string | React.ReactNode)[];
    selected?: number;
    filler: string;
    onChange: (selected: number) => void;
}) {
    const [open, setOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(selected);
    return (
        <div
            css={tw`flex flex-col bg-discord-800 rounded-md cursor-pointer w-64 text-discord-200 overflow-visible h-10`}
        >
            <div
                css={tw`py-2 px-3 rounded-md border-discord-900 border flex flex-row bg-discord-800`}
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(!open);
                }}
            >
                {isSelected || isSelected === 0 ? (
                    items[isSelected]
                ) : (
                    <span css={tw`text-discord-400`}>{filler}</span>
                )}
                &nbsp;
                <div css={tw`ml-auto w-3 my-auto`}>
                    {open ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                    )}
                </div>
            </div>
            {open && (
                <div css={tw`bg-discord-800 z-50`}>
                    {items.map((i, index) => (
                        <div
                            key={index}
                            css={css`
                                ${tw`py-2 px-3 rounded-md flex flex-row hover:bg-discord-800`} ${isSelected ===
                                    index &&
                                tw`bg-discord-900 hover:bg-discord-900`}
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                if (index === isSelected) return;
                                setIsSelected(index);
                                onChange(index);
                            }}
                        >
                            {i}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
