.text

#The program checks the ALU instruction in R_type

Main:
		addi    x14 , x0 , 131 
		addi    x9 , x0 , 32 
		addi    x22 , x0 , 3 
		addi    x23 , x0 , 142 
		addi    x10 , x0 , 4 
		blt     x14 , x9 , Less_r 
		bge     x14 , x9 , Bigger_r 
Less_r:
		sub     x17 , x22 , x23 
		and     x29 , x22 , x23 
		add     x29 , x29 , x17 
		srl     x29 , x29 , x10 
		addi    x1 , x0 , -9 
		bne     x29 , x1 , Fail 
Bigger_r:
		or      x17 , x22 , x23 
		xor     x29 , x22 , x23 
		add     x29 , x29 , x17 
		sra     x29 , x29 , x10 
		addi    x1 , x0 , 17 
		bne     x29 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
