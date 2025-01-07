.text

#The program checks the ALU instruction in R_type

Main:
		addi    x16 , x0 , 141 
		addi    x13 , x0 , 42 
		addi    x19 , x0 , 61 
		addi    x2 , x0 , 105 
		addi    x11 , x0 , 3 
		blt     x16 , x13 , Less_r 
		bge     x16 , x13 , Bigger_r 
Less_r:
		sub     x21 , x19 , x2 
		and     x1 , x19 , x2 
		add     x1 , x1 , x21 
		srl     x1 , x1 , x11 
		addi    x4 , x0 , -1 
		bne     x1 , x4 , Fail 
Bigger_r:
		or      x21 , x19 , x2 
		xor     x1 , x19 , x2 
		add     x1 , x1 , x21 
		sra     x1 , x1 , x11 
		addi    x4 , x0 , 26 
		bne     x1 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
