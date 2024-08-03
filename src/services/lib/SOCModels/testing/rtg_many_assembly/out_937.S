.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 155 
		addi    x27 , x0 , 74 
		addi    x29 , x0 , 41 
		bltu    x24 , x27 , Less_i 
		bgeu    x24 , x27 , Bigger_i 
Less_i:
		addi    x6 , x29 , 86 
		andi    x31 , x29 , 24 
		add     x31 , x31 , x6 
		srli    x31 , x31 , 4 
		addi    x22 , x0 , 8 
		bne     x31 , x22 , Fail 
Bigger_i:
		ori     x6 , x29 , 158 
		xori    x31 , x29 , 91 
		add     x31 , x31 , x6 
		srai    x31 , x31 , 2 
		addi    x22 , x0 , 76 
		bne     x31 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
