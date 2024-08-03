.text

#The program checks the ALU instruction in R_type

Main:
		addi    x24 , x0 , 110 
		addi    x4 , x0 , 11 
		addi    x2 , x0 , 57 
		addi    x5 , x0 , 107 
		addi    x27 , x0 , 1 
		blt     x24 , x4 , Less_r 
		bge     x24 , x4 , Bigger_r 
Less_r:
		sub     x17 , x2 , x5 
		and     x8 , x2 , x5 
		add     x8 , x8 , x17 
		srl     x8 , x8 , x27 
		addi    x19 , x0 , -5 
		bne     x8 , x19 , Fail 
Bigger_r:
		or      x17 , x2 , x5 
		xor     x8 , x2 , x5 
		add     x8 , x8 , x17 
		sra     x8 , x8 , x27 
		addi    x19 , x0 , 102 
		bne     x8 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
