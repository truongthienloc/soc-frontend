.text

#The program checks the ALU instruction in R_type

Main:
		addi    x9 , x0 , 13 
		addi    x5 , x0 , -86 
		addi    x18 , x0 , 38 
		addi    x31 , x0 , 184 
		addi    x2 , x0 , 0 
		blt     x9 , x5 , Less_r 
		bge     x9 , x5 , Bigger_r 
Less_r:
		sub     x6 , x18 , x31 
		and     x12 , x18 , x31 
		add     x12 , x12 , x6 
		srl     x12 , x12 , x2 
		addi    x19 , x0 , -114 
		bne     x12 , x19 , Fail 
Bigger_r:
		or      x6 , x18 , x31 
		xor     x12 , x18 , x31 
		add     x12 , x12 , x6 
		sra     x12 , x12 , x2 
		addi    x19 , x0 , 348 
		bne     x12 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
