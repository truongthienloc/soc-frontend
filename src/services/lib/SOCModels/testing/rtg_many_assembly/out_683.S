.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , 174 
		addi    x17 , x0 , 128 
		addi    x30 , x0 , 182 
		bltu    x7 , x17 , Less_i 
		bgeu    x7 , x17 , Bigger_i 
Less_i:
		addi    x26 , x30 , 16 
		andi    x24 , x30 , 155 
		add     x24 , x24 , x26 
		srli    x24 , x24 , 1 
		addi    x20 , x0 , 172 
		bne     x24 , x20 , Fail 
Bigger_i:
		ori     x26 , x30 , 195 
		xori    x24 , x30 , 35 
		add     x24 , x24 , x26 
		srai    x24 , x24 , 4 
		addi    x20 , x0 , 24 
		bne     x24 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
