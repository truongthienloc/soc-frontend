.text

#The program checks the ALU instruction in R_type

Main:
		addi    x28 , x0 , 18 
		addi    x25 , x0 , -81 
		addi    x17 , x0 , 161 
		addi    x23 , x0 , 10 
		addi    x21 , x0 , 1 
		blt     x28 , x25 , Less_r 
		bge     x28 , x25 , Bigger_r 
Less_r:
		sub     x4 , x17 , x23 
		and     x15 , x17 , x23 
		add     x15 , x15 , x4 
		srl     x15 , x15 , x21 
		addi    x22 , x0 , 75 
		bne     x15 , x22 , Fail 
Bigger_r:
		or      x4 , x17 , x23 
		xor     x15 , x17 , x23 
		add     x15 , x15 , x4 
		sra     x15 , x15 , x21 
		addi    x22 , x0 , 171 
		bne     x15 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
