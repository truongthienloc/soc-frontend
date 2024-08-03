.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 17 
		addi    x29 , x0 , 171 
		addi    x24 , x0 , 56 
		bltu    x12 , x29 , Less_i 
		bgeu    x12 , x29 , Bigger_i 
Less_i:
		addi    x26 , x24 , 193 
		andi    x31 , x24 , 57 
		add     x31 , x31 , x26 
		srli    x31 , x31 , 2 
		addi    x5 , x0 , 76 
		bne     x31 , x5 , Fail 
Bigger_i:
		ori     x26 , x24 , 15 
		xori    x31 , x24 , 57 
		add     x31 , x31 , x26 
		srai    x31 , x31 , 4 
		addi    x5 , x0 , 4 
		bne     x31 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
