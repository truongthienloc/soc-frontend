.text

#A function double in RISC-V that, when given an integer x, returns 2x

Initial:
		addi    x10 , x0 , 408 
		addi    x11 , x0 , 336 
		addi    x12 , x0 , 13 
		addi    x13 , x0 , 84 
		addi    x14 , x0 , 54 
		addi    x15 , x0 , 125 
		addi    x16 , x0 , 1 
		addi    x17 , x0 , 302 
		addi    x18 , x0 , 173 
Main:
		add     x10 , x10 , x10 
		xor     x11 , x11 , x11 
		sub     x12 , x12 , x12 
		srl     x13 , x13 , x13 
		and     x14 , x14 , x14 
		sra     x15 , x15 , x15 
		sll     x16 , x16 , x16 
		or      x17 , x17 , x17 
		add     x18 , x18 , x18 
Result:
		addi    x31 , x0 , 816 
		addi    x30 , x0 , 0 
		addi    x29 , x0 , 0 
		addi    x28 , x0 , 0 
		addi    x27 , x0 , 54 
		addi    x26 , x0 , 0 
		addi    x25 , x0 , 2 
		addi    x24 , x0 , 302 
		addi    x23 , x0 , 346 
		bne     x10 , x31 , Fail 
		bne     x11 , x30 , Fail 
		bne     x12 , x29 , Fail 
		bne     x13 , x28 , Fail 
		bne     x14 , x27 , Fail 
		bne     x15 , x26 , Fail 
		bne     x16 , x25 , Fail 
		bne     x17 , x24 , Fail 
		bne     x18 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
