.text

#A function double in RISC-V that, when given an integer x, returns 2x

Initial:
		addi    x19 , x0 , 327 
		addi    x20 , x0 , 405 
		addi    x21 , x0 , 77 
		addi    x22 , x0 , 942 
		addi    x23 , x0 , 248 
		addi    x24 , x0 , 21 
		addi    x25 , x0 , 4 
		addi    x26 , x0 , 429 
		addi    x27 , x0 , 478 
Main:
		add     x19 , x19 , x19 
		xor     x20 , x20 , x20 
		sub     x21 , x21 , x21 
		srl     x22 , x22 , x22 
		and     x23 , x23 , x23 
		sra     x24 , x24 , x24 
		sll     x25 , x25 , x25 
		or      x26 , x26 , x26 
		add     x27 , x27 , x27 
Result:
		addi    x2 , x0 , 654 
		addi    x3 , x0 , 0 
		addi    x4 , x0 , 0 
		addi    x5 , x0 , 0 
		addi    x6 , x0 , 248 
		addi    x7 , x0 , 0 
		addi    x8 , x0 , 64 
		addi    x9 , x0 , 429 
		addi    x10 , x0 , 956 
		bne     x19 , x2 , Fail 
		bne     x20 , x3 , Fail 
		bne     x21 , x4 , Fail 
		bne     x22 , x5 , Fail 
		bne     x23 , x6 , Fail 
		bne     x24 , x7 , Fail 
		bne     x25 , x8 , Fail 
		bne     x26 , x9 , Fail 
		bne     x27 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
