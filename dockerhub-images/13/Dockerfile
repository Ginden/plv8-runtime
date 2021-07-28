FROM postgres:13 AS builder

MAINTAINER ginden (michalwadas@gmail.com)

ENV PLV8_VERSION=3.0.0

RUN mkdir /build
WORKDIR /build



RUN apt-get -y -qq update

RUN apt-get -y -qq install postgresql-server-dev-13 gcc make g++ pkg-config libc++-dev wget git libncurses5 python python3  libc++abi-dev  > /dev/null

RUN wget -q https://github.com/plv8/plv8/archive/v${PLV8_VERSION}.tar.gz -O plv8.tar.gz

RUN tar -xvzf plv8.tar.gz

RUN git config --global user.email "you@example.com"
RUN git config --global user.name "Your Name"

# RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

# ENV PATH="/build/depot_tools:${PATH}"

# RUN gclient config

# RUN gclient sync

ENV GYP_CHROMIUM_NO_ACTION=0

WORKDIR /build/plv8-${PLV8_VERSION}

RUN make USE_PGXS=1

RUN make USE_PGXS=1 install

RUN apt-get -yq remove postgresql-server-dev-13 gcc make g++ pkg-config libc++-dev wget git libncurses5 python python3  libc++abi-dev

RUN apt-get autoremove -y

RUN apt-get install grep

RUN rm -rf /build/plv8-${PLV8_VERSION}/build

WORKDIR /build

RUN tar --list --file=/build/plv8.tar.gz | grep -v '/$' | xargs -n1 rm

RUN find .

FROM postgres:13
ENV PLV8_VERSION=3.0.0

RUN apt-get update
RUN apt-get install llvm
COPY --from=builder build/plv8-${PLV8_VERSION}/ /build

RUN env

WORKDIR /build


RUN /bin/mkdir -p '/usr/lib/postgresql/13/lib' && \
/bin/mkdir -p '/usr/share/postgresql/13/extension' && \
/bin/mkdir -p '/usr/share/postgresql/13/extension' && \
/usr/bin/install -c -m 755  plv8-3.0.0.so '/usr/lib/postgresql/13/lib/plv8-3.0.0.so' && \
/usr/bin/install -c -m 644 .//plv8.control '/usr/share/postgresql/13/extension/' && \
/usr/bin/install -c -m 644 .//plv8.control .//plv8--3.0.0.sql .//upgrade/plv8--1.5.1--3.0.0.sql .//upgrade/plv8--2.3.7--3.0.0.sql .//upgrade/plv8--1.5.2--3.0.0.sql .//upgrade/plv8--2.3.5--3.0.0.sql .//upgrade/plv8--2.3.2--3.0.0.sql .//upgrade/plv8--1.5.5--3.0.0.sql .//upgrade/plv8--2.3.0--3.0.0.sql .//upgrade/plv8--2.0.3--3.0.0.sql .//upgrade/plv8--1.5.0--3.0.0.sql .//upgrade/plv8--2.3.8--3.0.0.sql .//upgrade/plv8--2.1.0--3.0.0.sql .//upgrade/plv8--2.3.10--3.0.0.sql .//upgrade/plv8--2.0.1--3.0.0.sql .//upgrade/plv8--2.3.6--3.0.0.sql .//upgrade/plv8--1.5.7--3.0.0.sql .//upgrade/plv8--2.1.2--3.0.0.sql .//upgrade/plv8--1.5.6--3.0.0.sql .//upgrade/plv8--2.3.3--3.0.0.sql .//upgrade/plv8--2.3.9--3.0.0.sql .//upgrade/plv8--2.0.0--3.0.0.sql .//upgrade/plv8--1.5.3--3.0.0.sql .//upgrade/plv8--2.3.4--3.0.0.sql .//upgrade/plv8--2.3.1--3.0.0.sql .//upgrade/plv8--1.5.4--3.0.0.sql .//plcoffee.control .//plcoffee--3.0.0.sql .//plls.control .//plls--3.0.0.sql  '/usr/share/postgresql/13/extension/' && \
/bin/mkdir -p '/usr/lib/postgresql/13/lib/bitcode/plv8-3.0.0' && \
/bin/mkdir -p '/usr/lib/postgresql/13/lib/bitcode'/plv8-3.0.0/ && \
/usr/bin/install -c -m 644 plv8.bc '/usr/lib/postgresql/13/lib/bitcode'/plv8-3.0.0/./ && \
/usr/bin/install -c -m 644 plv8_type.bc '/usr/lib/postgresql/13/lib/bitcode'/plv8-3.0.0/./ && \
/usr/bin/install -c -m 644 plv8_func.bc '/usr/lib/postgresql/13/lib/bitcode'/plv8-3.0.0/./ && \
/usr/bin/install -c -m 644 plv8_param.bc '/usr/lib/postgresql/13/lib/bitcode'/plv8-3.0.0/./ && \
/usr/bin/install -c -m 644 plv8_allocator.bc '/usr/lib/postgresql/13/lib/bitcode'/plv8-3.0.0/./ && \
/usr/bin/install -c -m 644 coffee-script.bc '/usr/lib/postgresql/13/lib/bitcode'/plv8-3.0.0/./ && \
/usr/bin/install -c -m 644 livescript.bc '/usr/lib/postgresql/13/lib/bitcode'/plv8-3.0.0/./ && \
cd '/usr/lib/postgresql/13/lib/bitcode' && \
llvm-lto -thinlto -thinlto-action=thinlink -o plv8-3.0.0.index.bc plv8-3.0.0/plv8.bc plv8-3.0.0/plv8_type.bc plv8-3.0.0/plv8_func.bc plv8-3.0.0/plv8_param.bc plv8-3.0.0/plv8_allocator.bc plv8-3.0.0/coffee-script.bc plv8-3.0.0/livescript.bc


RUN find /build -type f
# RUN apt-get install make
# RUN cd /build && make USE_PGXS=1 install
