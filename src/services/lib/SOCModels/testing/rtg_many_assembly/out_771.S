.text

#The program checks the ALU instruction in R_type

Main:
		addi    x30 , x0 , 69 
		addi    x12 , x0 , -30 
		addi    x5 , x0 , 139 
		addi    x31 , x0 , 191 
		addi    x4 , x0 , 1 
		blt     x30 , x12 , Less_r 
		bge     x30 , x12 , Bigger_r 
Less_r:
		sub     x6 , x5 , x31 
		and     x20 , x5 , x31 
		add     x20 , x20 , x6 
		srl     x20 , x20 , x4 
		addi    x7 , x0 , 43 
		bne     x20 , x7 , Fail 
Bigger_r:
		or      x6 , x5 , x31 
		xor     x20 , x5 , x31 
		add     x20 , x20 , x6 
		sra     x20 , x20 , x4 
		addi    x7 , x0 , 121 
		bne     x20 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
