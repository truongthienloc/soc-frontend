.text

#The program checks the ALU instruction in R_type

Main:
		addi    x3 , x0 , 23 
		addi    x12 , x0 , -76 
		addi    x18 , x0 , 153 
		addi    x5 , x0 , 166 
		addi    x26 , x0 , 2 
		blt     x3 , x12 , Less_r 
		bge     x3 , x12 , Bigger_r 
Less_r:
		sub     x2 , x18 , x5 
		and     x7 , x18 , x5 
		add     x7 , x7 , x2 
		srl     x7 , x7 , x26 
		addi    x27 , x0 , 28 
		bne     x7 , x27 , Fail 
Bigger_r:
		or      x2 , x18 , x5 
		xor     x7 , x18 , x5 
		add     x7 , x7 , x2 
		sra     x7 , x7 , x26 
		addi    x27 , x0 , 63 
		bne     x7 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
