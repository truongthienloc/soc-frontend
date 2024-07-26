.text

#The program checks the ALU instruction in R_type

Main:
		addi    x26 , x0 , 57 
		addi    x16 , x0 , -42 
		addi    x15 , x0 , 85 
		addi    x18 , x0 , 126 
		addi    x31 , x0 , 3 
		blt     x26 , x16 , Less_r 
		bge     x26 , x16 , Bigger_r 
Less_r:
		sub     x12 , x15 , x18 
		and     x29 , x15 , x18 
		add     x29 , x29 , x12 
		srl     x29 , x29 , x31 
		addi    x4 , x0 , 5 
		bne     x29 , x4 , Fail 
Bigger_r:
		or      x12 , x15 , x18 
		xor     x29 , x15 , x18 
		add     x29 , x29 , x12 
		sra     x29 , x29 , x31 
		addi    x4 , x0 , 21 
		bne     x29 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
