.text

#The program checks the ALU instruction in R_type

Main:
		addi    x16 , x0 , 141 
		addi    x14 , x0 , 42 
		addi    x8 , x0 , 88 
		addi    x28 , x0 , 58 
		addi    x27 , x0 , 4 
		blt     x16 , x14 , Less_r 
		bge     x16 , x14 , Bigger_r 
Less_r:
		sub     x15 , x8 , x28 
		and     x12 , x8 , x28 
		add     x12 , x12 , x15 
		srl     x12 , x12 , x27 
		addi    x23 , x0 , 3 
		bne     x12 , x23 , Fail 
Bigger_r:
		or      x15 , x8 , x28 
		xor     x12 , x8 , x28 
		add     x12 , x12 , x15 
		sra     x12 , x12 , x27 
		addi    x23 , x0 , 13 
		bne     x12 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
