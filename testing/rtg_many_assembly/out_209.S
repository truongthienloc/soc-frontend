.text

#The program checks the ALU instruction in I_type

Main:
		addi    x10 , x0 , 60 
		addi    x14 , x0 , 125 
		sltiu   x22 , x10 , 125 
		bltu    x10 , x14 , Less_i 
		bgeu    x10 , x14 , Bigger_i 
Less_i:
		ori     x18 , x10 , 122 
		sub     x15 , x14 , x10 
		srai    x15 , x15 , 3 
		and     x15 , x15 , x0 
		addi    x28 , x0 , 0 
		beq     x15 , x28 , Pass 
Bigger_i:
		ori     x18 , x10 , 128 
		sub     x15 , x14 , x10 
		srai    x15 , x15 , 0 
		and     x15 , x15 , x0 
		addi    x28 , x0 , 0 
		beq     x15 , x28 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
