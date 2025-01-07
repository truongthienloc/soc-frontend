.text

#The program checks the ALU instruction in R_type

Main:
		addi    x15 , x0 , 169 
		addi    x19 , x0 , 70 
		addi    x17 , x0 , 3 
		addi    x25 , x0 , 6 
		addi    x23 , x0 , 2 
		blt     x15 , x19 , Less_r 
		bge     x15 , x19 , Bigger_r 
Less_r:
		sub     x4 , x17 , x25 
		and     x2 , x17 , x25 
		add     x2 , x2 , x4 
		srl     x2 , x2 , x23 
		addi    x1 , x0 , -1 
		bne     x2 , x1 , Fail 
Bigger_r:
		or      x4 , x17 , x25 
		xor     x2 , x17 , x25 
		add     x2 , x2 , x4 
		sra     x2 , x2 , x23 
		addi    x1 , x0 , 3 
		bne     x2 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
