.text

#The program checks the ALU instruction in R_type

Main:
		addi    x31 , x0 , 25 
		addi    x28 , x0 , -74 
		addi    x11 , x0 , 194 
		addi    x2 , x0 , 91 
		addi    x21 , x0 , 1 
		blt     x31 , x28 , Less_r 
		bge     x31 , x28 , Bigger_r 
Less_r:
		sub     x3 , x11 , x2 
		and     x4 , x11 , x2 
		add     x4 , x4 , x3 
		srl     x4 , x4 , x21 
		addi    x5 , x0 , 84 
		bne     x4 , x5 , Fail 
Bigger_r:
		or      x3 , x11 , x2 
		xor     x4 , x11 , x2 
		add     x4 , x4 , x3 
		sra     x4 , x4 , x21 
		addi    x5 , x0 , 186 
		bne     x4 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
