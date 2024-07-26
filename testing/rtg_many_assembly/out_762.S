.text

#A function double in RISC-V that, when given an integer x, returns 2x

Initial:
		addi    x23 , x0 , 88 
		addi    x24 , x0 , 482 
		addi    x25 , x0 , 380 
		addi    x26 , x0 , 872 
		addi    x27 , x0 , 243 
		addi    x28 , x0 , 451 
		addi    x29 , x0 , 5 
		addi    x30 , x0 , 244 
		addi    x31 , x0 , 408 
Main:
		add     x23 , x23 , x23 
		xor     x24 , x24 , x24 
		sub     x25 , x25 , x25 
		srl     x26 , x26 , x26 
		and     x27 , x27 , x27 
		sra     x28 , x28 , x28 
		sll     x29 , x29 , x29 
		or      x30 , x30 , x30 
		add     x31 , x31 , x31 
Result:
		addi    x2 , x0 , 176 
		addi    x3 , x0 , 0 
		addi    x4 , x0 , 0 
		addi    x5 , x0 , 3 
		addi    x6 , x0 , 243 
		addi    x7 , x0 , 56 
		addi    x8 , x0 , 160 
		addi    x9 , x0 , 244 
		addi    x10 , x0 , 816 
		bne     x23 , x2 , Fail 
		bne     x24 , x3 , Fail 
		bne     x25 , x4 , Fail 
		bne     x26 , x5 , Fail 
		bne     x27 , x6 , Fail 
		bne     x28 , x7 , Fail 
		bne     x29 , x8 , Fail 
		bne     x30 , x9 , Fail 
		bne     x31 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
