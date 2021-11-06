import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { css } from 'styled-components';
import tw from 'twin.macro';

export default function ColorPicker({
    current,
    onClose,
}: {
    current?: string;
    onClose?: (current: string) => void;
}) {
    const [color, setColor] = useState(current ?? '#ff0000');
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div
                css={tw`inline-block cursor-pointer`}
                onClick={() => {
                    setOpen(!open);
                    if (open) {
                        if (onClose) onClose(color);
                    }
                }}
            >
                <div
                    css={css`
                        background-color: ${color};
                        ${tw`w-12 h-12 rounded-md`}
                    `}
                />
            </div>
            {open && (
                <div
                    css={css`
                        position: absolute;
                        z-index: 2;
                    `}
                >
                    <HexColorPicker
                        color={color}
                        onChange={(color) => {
                            setColor(color);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
