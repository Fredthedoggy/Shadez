import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { APIEmbed, APIEmbedField } from 'discord-api-types/v9';
import { css } from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import {
    faAngleLeft,
    faAngleRight,
    faImage,
    faPlus,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ColorPicker from './ColorPicker';

export default function Embed({
    embed: embedIn,
    editable,
    onChange: iOnChange,
}:
    | { embed: APIEmbed; editable: false; onChange: undefined }
    | {
          embed?: APIEmbed;
          editable: true;
          onChange: (embed: APIEmbed) => void;
      }) {
    const [embed, setEmbed] = useState<
        APIEmbed & { fields?: (APIEmbedField & { id?: number })[] }
    >(embedIn ?? {});
    useEffect(() => {
        if (editable) return;
        setEmbed(embedIn ?? {});
    }, [embedIn]);
    const onChange = (embed: APIEmbed) => {
        if (!iOnChange) return;
        const newEmbed = Object.assign({}, embed);
        if (newEmbed.fields) {
            newEmbed.fields = newEmbed.fields.map(
                ({ name, value, inline }) => ({ name, value, inline })
            );
        }
        iOnChange(newEmbed);
    };
    return (
        <div
            css={css`
                border-color: ${embed.color != undefined
                    ? '#' + ('000000' + embed.color?.toString(16)).substr(-6)
                    : '#fff'};
                max-width: 520px;
                ${tw`bg-discord-700 border-l-4 p-3 grid auto-cols-auto auto-rows-auto text-white`}
                border-radius: 4px
            `}
        >
            {editable ? (
                <>
                    <div css={tw`flex flex-row col-span-1`}>
                        {embed.author?.icon_url ? (
                            <img
                                src={embed.author?.icon_url}
                                alt={'Author Icon'}
                                css={tw`h-6 rounded-full mr-2 font-semibold text-sm`}
                            />
                        ) : (
                            <div css={tw`h-6 w-6 mr-2 font-semibold text-sm`}>
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                        )}
                        <EditableSpan
                            placeholder={'Author'}
                            content={embed.author?.name}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!newEmbed.author)
                                    newEmbed.author = { name: '' };
                                if (
                                    !content &&
                                    !newEmbed.author.url &&
                                    !newEmbed.author.icon_url
                                )
                                    delete newEmbed.author;
                                else newEmbed.author.name = content ?? '';
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                            inline
                        />
                        <EditableSpan
                            placeholder={'Author URL'}
                            content={embed.author?.url}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!newEmbed.author)
                                    newEmbed.author = { name: '' };
                                if (
                                    !content &&
                                    !newEmbed.author.name &&
                                    !newEmbed.author.icon_url
                                )
                                    delete newEmbed.author;
                                else {
                                    newEmbed.author.url = content;
                                }
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                            inline
                        />
                    </div>
                    <div css={tw`col-span-1 font-semibold`}>
                        <EditableSpan
                            placeholder={'Title'}
                            content={embed.title}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!content) delete newEmbed.title;
                                else newEmbed.title = content;
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                        />
                    </div>
                    <div css={tw`col-span-1 text-sm`}>
                        <EditableSpan
                            placeholder={'Description'}
                            content={embed?.description}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!content) delete newEmbed.description;
                                else newEmbed.description = content;
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                        />
                    </div>
                    <div css={tw`col-span-1 flex flex-row flex flex-wrap`}>
                        {(embed.fields ?? []).map(
                            (field: APIEmbedField & { id?: number }, index) => {
                                if (!field.id) field.id = Math.random();
                                return (
                                    <div
                                        key={field.id}
                                        css={css`
                                            ${tw`text-sm line-height[1.125rem] mt-2 mr-2 hover:bg-discord-800 rounded-md`} ${field.inline
                                                ? tw`inline-block flex-grow flex-shrink`
                                                : tw`min-w-full`}
                                          position: relative;
                                            overflow: visible;

                                            .button {
                                                ${tw`hidden`}
                                            }

                                            :hover > .button {
                                                ${tw`flex`}
                                            }
                                        `}
                                    >
                                        <div
                                            className={'button'}
                                            css={css`
                                                position: absolute;
                                                top: -0.75rem;
                                                right: -0.75rem;
                                                ${tw`text-white bg-discord-danger rounded-full w-6 h-6 flex z-40 cursor-pointer`}
                                            `}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const newEmbed = Object.assign(
                                                    {},
                                                    embed
                                                );
                                                if (!newEmbed.fields)
                                                    newEmbed.fields = [];
                                                newEmbed.fields.splice(
                                                    index,
                                                    1
                                                );
                                                setEmbed(newEmbed);
                                                onChange && onChange(embed);
                                            }}
                                        >
                                            <div css={tw`w-3 m-auto`}>
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={'button'}
                                            css={css`
                                                position: absolute;
                                                top: 1rem;
                                                right: -0.75rem;
                                                ${tw`text-white bg-discord-800 rounded-full w-6 h-6 flex z-40 cursor-pointer`}
                                            `}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const newEmbed = Object.assign(
                                                    {},
                                                    embed
                                                );
                                                if (!newEmbed.fields)
                                                    newEmbed.fields = [];
                                                newEmbed.fields[index].inline =
                                                    !newEmbed.fields[index]
                                                        .inline;
                                                setEmbed(newEmbed);
                                                onChange && onChange(embed);
                                            }}
                                        >
                                            <div css={tw`w-3 m-auto`}>
                                                {(embed.fields ?? [])[index]
                                                    .inline ? (
                                                    <FontAwesomeIcon
                                                        icon={faAngleRight}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faAngleLeft}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            css={tw`font-semibold margin-bottom[0.125rem]`}
                                        >
                                            <EditableSpan
                                                placeholder={'Field Name'}
                                                content={field.name}
                                                onChange={(content) => {
                                                    const newEmbed =
                                                        Object.assign(
                                                            {},
                                                            embed
                                                        );
                                                    if (!newEmbed.fields)
                                                        newEmbed.fields = [];
                                                    if (!content)
                                                        newEmbed.fields[
                                                            index
                                                        ].name = '';
                                                    else
                                                        newEmbed.fields[
                                                            index
                                                        ].name = content;
                                                    setEmbed(newEmbed);
                                                    onChange(newEmbed);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <EditableSpan
                                                placeholder={'Field Value'}
                                                content={field.value}
                                                onChange={(content) => {
                                                    const newEmbed =
                                                        Object.assign(
                                                            {},
                                                            embed
                                                        );
                                                    if (!newEmbed.fields)
                                                        newEmbed.fields = [];
                                                    if (!content)
                                                        newEmbed.fields[
                                                            index
                                                        ].value = '';
                                                    else
                                                        newEmbed.fields[
                                                            index
                                                        ].value = content;
                                                    setEmbed(newEmbed);
                                                    if (onChange)
                                                        onChange(newEmbed);
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                        )}
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                const newEmbed = Object.assign({}, embed);
                                if (!newEmbed.fields) newEmbed.fields = [];
                                newEmbed.fields.push({
                                    name: '',
                                    value: '',
                                    inline: false,
                                });
                                setEmbed(newEmbed);
                                onChange && onChange(embed);
                            }}
                            css={tw`flex bg-discord-800 rounded-sm w-full h-16 text-white cursor-pointer my-2`}
                        >
                            <div css={tw`m-auto w-6`}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {embed.author && (
                        <div css={tw`flex flex-row col-span-1`}>
                            {embed.author.icon_url && (
                                <img
                                    src={embed.author.icon_url}
                                    alt={'Author Icon'}
                                    css={tw`h-6 rounded-full mr-2 font-semibold text-sm`}
                                />
                            )}
                            {embed.author.name && (
                                <div>{embed.author.name}</div>
                            )}
                        </div>
                    )}
                    {embed.title && (
                        <div css={tw`col-span-1 font-semibold`}>
                            {embed.title}
                        </div>
                    )}
                    {embed.description && (
                        <div css={tw`col-span-1 text-sm`}>
                            {embed.description}
                        </div>
                    )}
                    {embed.fields && (
                        <div
                            css={tw`col-span-1 flex flex-row flex flex-wrap mb-2`}
                        >
                            {embed.fields.map((field, index) => (
                                <div
                                    key={index}
                                    css={css`
                                        ${tw`text-sm line-height[1.125rem] min-w-min max-w-max mt-2 mr-2`} ${field.inline
                                            ? tw`inline-block flex-grow flex-shrink`
                                            : tw`min-w-full`}
                                    `}
                                >
                                    <div
                                        css={tw`font-semibold margin-bottom[0.125rem]`}
                                    >
                                        {field.name}
                                    </div>
                                    <div>{field.value}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {embed.thumbnail && (
                <div
                    css={css`
                        grid-row: 1/8;
                        grid-column: 2/2;
                        margin-left: 16px;
                        margin-top: 8px;
                        flex-shrink: 0;
                        justify-self: end;
                        ${tw`h-20 w-20 rounded-md overflow-hidden`}
                    `}
                >
                    <img src={embed.thumbnail.url} alt={'thumbnail'} />
                </div>
            )}
            {embed.image && (
                <div css={tw`rounded-md overflow-hidden max-w-max`}>
                    <img src={embed.image.url} alt={'image'} />
                </div>
            )}
            {editable ? (
                <>
                    <div css={tw`my-2`}>
                        <ColorPicker
                            current={
                                '#' +
                                ('000000' + embed.color?.toString(16)).substr(
                                    -6
                                )
                            }
                            onClose={(current) => {
                                const newEmbed = Object.assign({}, embed);
                                newEmbed.color = parseInt(
                                    current.split('#')[1],
                                    16
                                );
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                        />
                    </div>
                    <div css={tw`flex flex-col`}>
                        <div css={tw`text-xl font-semibold`}>Icons:</div>
                        <div css={tw`font-semibold ml-2`}>Author Icon:</div>
                        <EditableSpan
                            placeholder={'Author Icon'}
                            content={embed.author?.icon_url}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!newEmbed.author)
                                    newEmbed.author = { name: '' };
                                if (
                                    !content &&
                                    !newEmbed.author.name &&
                                    !newEmbed.author.icon_url
                                )
                                    delete newEmbed.author;
                                else if (!content)
                                    delete newEmbed.author.icon_url;
                                else {
                                    newEmbed.author.icon_url = content;
                                }
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                        />
                        <div css={tw`font-semibold ml-2`}>Thumbnail Icon:</div>
                        <EditableSpan
                            placeholder={'Thumbnail Icon'}
                            content={embed.thumbnail?.url}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!newEmbed.thumbnail)
                                    newEmbed.thumbnail = { url: '' };
                                if (!content) delete newEmbed.thumbnail;
                                else {
                                    newEmbed.thumbnail.url = content;
                                }
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                        />
                        <div css={tw`font-semibold ml-2`}>Footer Icon:</div>
                        <EditableSpan
                            placeholder={'Footer Icon'}
                            content={embed.footer?.icon_url}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!newEmbed.footer)
                                    newEmbed.footer = { text: '' };
                                if (!content && !newEmbed.footer.text)
                                    delete newEmbed.footer;
                                else if (!content)
                                    delete newEmbed.footer.icon_url;
                                else {
                                    newEmbed.footer.icon_url = content;
                                }
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                        />
                        <div css={tw`font-semibold ml-2`}>Main Image:</div>
                        <EditableSpan
                            placeholder={'Main Image'}
                            content={embed.image?.url}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!newEmbed.image)
                                    newEmbed.image = { url: content ?? '' };
                                if (!content) delete newEmbed.image;
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                        />
                    </div>
                    <div css={tw`flex flex-row items-center mt-2`}>
                        {embed.footer?.icon_url && (
                            <img
                                src={embed.footer.icon_url}
                                alt={'Footer Picture'}
                                css={tw`h-5 w-5 rounded-full mr-2`}
                            />
                        )}
                        <EditableSpan
                            content={embed.footer?.text}
                            placeholder={'Footer'}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!newEmbed.footer)
                                    newEmbed.footer = { text: '' };
                                if (!content) newEmbed.footer.text = '';
                                else newEmbed.footer.text = content;
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                            inline
                        />
                        &nbsp;
                        <span css={tw`font-semibold`}>•&nbsp;</span>
                        <EditableSpan
                            placeholder={'Timestamp'}
                            content={embed.timestamp}
                            onChange={(content) => {
                                const newEmbed = Object.assign({}, embed);
                                if (!content) delete embed.timestamp;
                                else newEmbed.timestamp = content;
                                setEmbed(newEmbed);
                                onChange(newEmbed);
                            }}
                        />
                    </div>
                </>
            ) : (
                <>
                    {embed.footer && (
                        <div css={tw`flex flex-row items-center mt-2`}>
                            {embed.footer.icon_url && (
                                <img
                                    src={embed.footer.icon_url}
                                    alt={'Footer Picture'}
                                    css={tw`h-5 w-5 rounded-full mr-2`}
                                />
                            )}
                            {embed.footer.text && (
                                <span>{embed.footer.text}&nbsp;</span>
                            )}
                            {embed.timestamp && (
                                <>
                                    <span css={tw`font-semibold`}>•&nbsp;</span>
                                    <span>
                                        {new Date(
                                            embed.timestamp
                                        ).toLocaleDateString()}
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

const EditableSpan = ({
    content,
    onChange,
    placeholder,
    inline,
}: {
    content?: string;
    onChange: (content?: string) => void;
    placeholder?: string;
    inline?: boolean;
}) => {
    const [iContent, setIContent] = useState(content);
    return (
        <span
            css={css`
                > * {
                    all: unset;
                    ${tw`w-full h-full focus:bg-discord-800`}
                    ${!inline && tw`p-2 rounded-md`}
                height: auto;
                    max-width: 94%;
                }
            `}
        >
            <TextareaAutosize
                onChange={(e) => {
                    setIContent(e.currentTarget.value);
                    onChange(e.currentTarget.value);
                }}
                onBlur={() => onChange(iContent)}
                placeholder={placeholder ?? 'Content'}
                value={iContent}
            />
        </span>
    );
};
