.text

#The program checks the ALU instruction in R_type

Main:
		addi    x15 , x0 , 11 
		addi    x16 , x0 , -88 
		addi    x22 , x0 , 121 
		addi    x2 , x0 , 166 
		addi    x4 , x0 , 2 
		blt     x15 , x16 , Less_r 
		bge     x15 , x16 , Bigger_r 
Less_r:
		sub     x18 , x22 , x2 
		and     x8 , x22 , x2 
		add     x8 , x8 , x18 
		srl     x8 , x8 , x4 
		addi    x13 , x0 , -4 
		bne     x8 , x13 , Fail 
Bigger_r:
		or      x18 , x22 , x2 
		xor     x8 , x22 , x2 
		add     x8 , x8 , x18 
		sra     x8 , x8 , x4 
		addi    x13 , x0 , 119 
		bne     x8 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
