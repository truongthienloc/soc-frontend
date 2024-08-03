.text

#The program checks the ALU instruction in R_type

Main:
		addi    x31 , x0 , 154 
		addi    x3 , x0 , 55 
		addi    x2 , x0 , 89 
		addi    x28 , x0 , 2 
		addi    x9 , x0 , 3 
		blt     x31 , x3 , Less_r 
		bge     x31 , x3 , Bigger_r 
Less_r:
		sub     x6 , x2 , x28 
		and     x17 , x2 , x28 
		add     x17 , x17 , x6 
		srl     x17 , x17 , x9 
		addi    x29 , x0 , 10 
		bne     x17 , x29 , Fail 
Bigger_r:
		or      x6 , x2 , x28 
		xor     x17 , x2 , x28 
		add     x17 , x17 , x6 
		sra     x17 , x17 , x9 
		addi    x29 , x0 , 22 
		bne     x17 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
