.text

#The program checks the ALU instruction in R_type

Main:
		addi    x27 , x0 , 87 
		addi    x8 , x0 , -12 
		addi    x18 , x0 , 194 
		addi    x15 , x0 , 190 
		addi    x9 , x0 , 3 
		blt     x27 , x8 , Less_r 
		bge     x27 , x8 , Bigger_r 
Less_r:
		sub     x2 , x18 , x15 
		and     x30 , x18 , x15 
		add     x30 , x30 , x2 
		srl     x30 , x30 , x9 
		addi    x4 , x0 , 16 
		bne     x30 , x4 , Fail 
Bigger_r:
		or      x2 , x18 , x15 
		xor     x30 , x18 , x15 
		add     x30 , x30 , x2 
		sra     x30 , x30 , x9 
		addi    x4 , x0 , 47 
		bne     x30 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
