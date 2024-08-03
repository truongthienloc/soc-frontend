.text

#The program checks the ALU instruction in R_type

Main:
		addi    x30 , x0 , 71 
		addi    x13 , x0 , -28 
		addi    x29 , x0 , 188 
		addi    x25 , x0 , 101 
		addi    x15 , x0 , 4 
		blt     x30 , x13 , Less_r 
		bge     x30 , x13 , Bigger_r 
Less_r:
		sub     x1 , x29 , x25 
		and     x18 , x29 , x25 
		add     x18 , x18 , x1 
		srl     x18 , x18 , x15 
		addi    x10 , x0 , 7 
		bne     x18 , x10 , Fail 
Bigger_r:
		or      x1 , x29 , x25 
		xor     x18 , x29 , x25 
		add     x18 , x18 , x1 
		sra     x18 , x18 , x15 
		addi    x10 , x0 , 29 
		bne     x18 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
